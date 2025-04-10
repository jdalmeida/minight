import CreateDeployment from "@/components/dashboard/create-deployment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";

export default function Page() {
  return (
    <div>
      <h1 className="mb-8 font-black text-2xl">Apps</h1>
      <div className="flex h-full w-full items-center justify-center">
        <Card className="flex w-full max-w-xl flex-col items-center justify-center rounded-md border-dashed p-8">
          <PlusCircleIcon className="size-10"/>
          <p>Sem nenhum deploy ainda.</p>
          <CreateDeployment/>
        </Card>
      </div>
    </div>
  );
}
