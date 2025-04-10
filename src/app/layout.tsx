import "@/styles/globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

export const metadata: Metadata = {
	title: "MINIGHT",
	description: "The self-hosted Vercel clone",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const jetbrains = JetBrains_Mono({
	subsets: ["latin"]
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider localization={ptBR}>
			<html lang="pt-br" className={`dark ${jetbrains.className}`}>
				<body>
					<TRPCReactProvider>{children}</TRPCReactProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
