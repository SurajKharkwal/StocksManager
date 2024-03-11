import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background antialiased",
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col min-h-[100dvh]">
						<Navbar />
						<main className="md:pl-40 md:pr-40">
							{children}
						</main>
						{/* <footer className="w-full flex fixed bottom-0 flex-col items-center justify-center py-3">
							<h6>created by</h6>
							<h6 className="text-blue-500">FlyingHawk</h6>
					</footer> */}
					</div>
				</Providers>
			</body>
		</html>
	);
}
