"use client"
import type React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"

export function MainContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar()

  return (
    <div
      className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        //state === "expanded" ? "md:pl-[var(--sidebar-width)]" : "md:pl-0",
      )}
    >
      <Header />
      <main className="flex-1 md:mt-8 mt-4 p-4">{children}</main>
    </div>
  )
}