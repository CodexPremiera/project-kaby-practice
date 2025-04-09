"use client";

import { Link as ScrollLink } from "react-scroll";
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
import HeaderMobile from "./HeaderMobile";

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

const links = [
	{ name: "get started", path: "get_started" },
	{ name: "about", path: "about" },
	{ name: "faq", path: "faq" },
];

const Header = () => {
	return (
		<header className="bg-primary py-4">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					{/* logo */}
					<Logo />
					{/* nav */}
					<nav className="hidden xl:flex items-center gap-12">
						<ul className="flex">
							{links.map((link, index) => (
								<li
									key={index}
									className="text-black-100 text-sm uppercase font-primary font-medium tracking-[1.2px] after:mx-4 last:after:content-none after:text-orange-accent-100"
								>
									<ScrollLink
										to={link.path}
										smooth
										spy
										className="cursor-pointer"
										activeClass="text-secondary"
									>
										{link.name}
									</ScrollLink>
								</li>
							))}
						</ul>

						{/* buttons */}
						<Button variant="default" className="text-black">
							Login
						</Button>
						<ModeToggle />
					</nav>

					{/* mobile nav */}
					<div className="xl:hidden">
						<HeaderMobile />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
