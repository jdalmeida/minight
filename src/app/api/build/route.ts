import { NextResponse } from "next/server";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import yaml from "yaml";

export async function POST(req: Request) {
  const body = await req.json();
  const repoUrl = body.repoUrl;
  const envVars: Record<string, string> = body.env || {};

  const encoder = new TextEncoder();
  const tempDir = mkdtempSync(join(tmpdir(), "ci-"));

  const stream = new ReadableStream({
    async start(controller) {
      const send = (text: string) => controller.enqueue(encoder.encode(text));

      const runCmd = (cmd: string, cwd = tempDir) => {
        return new Promise<void>((resolve, reject) => {
          const proc = spawn(cmd, {
            cwd,
            shell: true,
            env: { ...process.env, ...envVars },
          });

          proc.stdout.on("data", (d) => send(d.toString()));
          proc.stderr.on("data", (d) => send(d.toString()));
          proc.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Erro ao rodar ${cmd}`));
          });
        });
      };

      try {
        send("🚀 Clonando repositório...\n");
        await runCmd(`git clone ${repoUrl} .`);

        const yamlPath = join(tempDir, ".gitlab-ci.yml");
        const rawYaml = readFileSync(yamlPath, "utf8");
        const parsed = yaml.parse(rawYaml);

        for (const stage of parsed.stages) {
          for (const jobName in parsed) {
            const job = parsed[jobName];
            if (job.stage === stage && job.script) {
              send(`\n🔧 Executando stage: ${stage} (${jobName})\n`);

              for (const cmd of job.script) {
                const interpolatedCmd = cmd.replace(/\$([A-Z_]+)/g, (_: unknown, varName: string | number) =>
                  envVars[varName] || process.env[varName] || ""
                );
                send(`\n$ ${interpolatedCmd}\n`);
                await runCmd(interpolatedCmd);
              }
            }
          }
        }

        send("\n✅ Pipeline finalizada com sucesso!\n");
      } catch (e: unknown) {
        send(`\n❌ Erro:\n${JSON.stringify(e)}\n`);
      } finally {
        controller.close();
        rmSync(tempDir, { recursive: true, force: true });
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
