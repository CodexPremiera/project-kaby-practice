"use client";

import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

import Logo from "../Logo";
import GuestHeaderMobile from "./GuestHeaderMobile";
import { ModeToggle } from "../ModeToggle";
import { Button } from "@/components/ui/button";

// Navigation links configuration
const links = [
	{ name: "about", path: "/about", scroll: false },
	{ name: "get started", path: "get_started", scroll: true },
	{ name: "faq", path: "faq", scroll: true },
];

const GuestHeader = () => {
	return (
		<header className="flex flex-shrink-0 items-center justify-between py-4 px-12 border-b bg-white dark:bg-[#1F1F1F] text-[#111] dark:text-[#e9e9e9] border-b-[#CDCDCD] dark:border-b-[#444444]">
			<div className="container mx-auto flex items-center justify-between">

				{/* Logo */}
				<Logo />

				{/* Desktop Navigation */}
				<nav className="hidden xl:flex items-center gap-12">
					{/* Navigation Links */}
					<ul className="flex gap-4">
						{links.map((link, index) => (
							<li
								key={index}
								className="text-sm uppercase tracking-[1.2px] font-primary after:mx-4 last:after:content-none after:text-orange-accent-100"
							>
								{link.scroll ? (
									<ScrollLink
										to={link.path}
										smooth
										spy
										className="cursor-pointer hover:text-secondary"
										activeClass="text-secondary"
									>
										{link.name}
									</ScrollLink>
								) : (
									<Link
										href={link.path}
										className="cursor-pointer hover:text-secondary"
									>
										{link.name}
									</Link>
								)}
							</li>
						))}
					</ul>

					{/* Actions */}
					<div className="flex items-center gap-4">
						<ModeToggle />
						<Link href="/login" passHref>
							<Button
								asChild
								variant="default"
								className="rounded-full bg-[#ffa52f] text-[#111111]"
							>
								<span>Login</span>
							</Button>
						</Link>
					</div>
				</nav>

				{/* Mobile Navigation */}
				<div className="xl:hidden">
					<GuestHeaderMobile />
				</div>
			</div>
		</header>
	);
};

export default GuestHeader;
