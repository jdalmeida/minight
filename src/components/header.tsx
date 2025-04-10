"use client"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Moon } from "lucide-react";

export function Header() {
  const { state } = useSidebar()

  return (
    <header className="border-b">
      <div
        className={cn(
          "fixed flex place-self-end flex-col p-2 items-center w-full z-50 bg-background/70 backdrop-blur-md transition-all duration-300",
          state === "expanded" ? "md:w-[calc(98dvw-var(--sidebar-width))]" : "md:w-full",
        )}
      >
        <div className="flex w-full justify-around items-center">
          <SidebarTrigger />
          <h1 className="min-w-fit flex-1 text-xl font-black italic text-center justify-center align-middle flex items-center">
            <Moon className="size-4 mr-1" />
            MINIGHT
          </h1>
          <div className="ml-4 flex items-center space-x-4">
            <UserButton/>
          </div>
        </div>
      </div>
    </header>
  )
}