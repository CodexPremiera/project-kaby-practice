"use client";

import { Link as ScrollLink } from "react-scroll";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import GuestHeaderMobile from "./GuestHeaderMobile";
import { ModeToggle } from "../ModeToggle";

const links = [
	{ name: "about", path: "/about", scroll: false },
	{ name: "get started", path: "get_started", scroll: true },
	{ name: "faq", path: "faq", scroll: true },
];

const GuestHeader = () => {
	return (
		<header className="bg-primary py-4">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Logo />

					{/* Navigation */}
					<nav className="hidden xl:flex items-center gap-12">
						<ul className="flex">
							{links.map((link, index) => (
								<li
									key={index}
									className="text-black-100 text-sm uppercase font-primary font-medium tracking-[1.2px] after:mx-4 last:after:content-none after:text-orange-accent-100"
								>
									{link.scroll ? (
										<ScrollLink
											to={link.path}
											smooth={true}
											spy={true}
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

						{/* Login Button */}
						<Link href="/login" passHref>
							<Button asChild variant="default" className="text-black">
								<span>Login</span>
							</Button>
						</Link>

						{/* Theme Toggle */}
						<ModeToggle />
					</nav>

					{/* Mobile Menu */}
					<div className="xl:hidden">
						<GuestHeaderMobile />
					</div>
				</div>
			</div>
		</header>
	);
};

export default GuestHeader;
