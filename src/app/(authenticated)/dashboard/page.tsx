import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-8">Apps</h1>
      <div className="flex justify-center items-center w-full h-full">
        <Card className="flex p-8 items-center justify-center flex-col max-w-xl w-full border-dashed rounded-md">
          <PlusCircleIcon className="size-10"/>
          <p>Sem nenhum deploy ainda.</p>
          <Button>Adicionar app +</Button>
        </Card>
      </div>
    </div>
  );
}
