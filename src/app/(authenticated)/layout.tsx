import type React from "react"
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"
import { MainContent } from "@/components/main-content"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar className="z-[100]" />
          <MainContent>{children}</MainContent>
        </div>
      </SidebarProvider>
    </section>
  )
}
