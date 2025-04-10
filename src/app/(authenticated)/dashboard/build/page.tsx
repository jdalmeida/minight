"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BuildPage() {
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get("repoUrl");
  const [logs, setLogs] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startBuild = async () => {
    setLogs("");
    setIsLoading(true);

    const res = await fetch("/api/build", {
      method: "POST",
      body: JSON.stringify({
        repoUrl: repoUrl,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setLogs((prev) => prev + decoder.decode(value));
    }

    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <Button
        onClick={startBuild}
        disabled={isLoading}
      >
        {isLoading ? "Buildando..." : "Iniciar Build"}
      </Button>
      <pre className="h-[500px] overflow-auto whitespace-pre-wrap rounded bg-black p-4 font-mono text-green-400">
        {logs || "Logs aparecerão aqui..."}
      </pre>
    </div>
  );
}
