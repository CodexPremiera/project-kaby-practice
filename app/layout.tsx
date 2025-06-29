import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import {Toaster} from "@/components/ui/sonner";

const workSans = localFont({
	src: [
		{
			path: "./fonts/WorkSans-Black.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-ExtraBold.ttf",
			weight: "800",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Black.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Thin.ttf",
			weight: "200",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-ExtraLight.ttf",
			weight: "100",
			style: "normal",
		},
	],
	variable: "--font-work-sans",
});

export const metadata: Metadata = {
	title: "Kaby",
	description: "Your Public Service Platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${workSans.variable} pattern background-1 text-primary`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
