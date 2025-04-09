"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GuestHeaderMobile from "./GuestHeaderMobile";
import Link from "next/link";

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black-100" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-black-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

const BarangayHeader = () => {
	return (
		<header className="h-[65px] flex justify-center items-center sm:ml-[75px] border-b border-black/10 pr-0 sm:pr-[45px]">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					<Logo />
					<div className="flex flex-end gap-8">
						<div>
							<Button variant="barangay">Barangay</Button>
						</div>
						<div>
							{" "}
							<ModeToggle />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default BarangayHeader;
