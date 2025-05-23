"use client";

import { Link as ScrollLink } from "react-scroll";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import GuestHeaderMobile from "./GuestHeaderMobile";
import { ModeToggle } from "./ModeToggle";

const links = [
	{ name: "about", path: "/about", scroll: false },
	{ name: "get started", path: "get_started", scroll: true },
	{ name: "faq", path: "faq", scroll: true },
];

const DefaultHeader = () => {
	return (
		<header className="bg-primary py-4">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Logo />

					{/* Navigation */}
					<nav className="hidden xl:flex items-center gap-12">
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

export default DefaultHeader;
