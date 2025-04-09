"use client";

import { useState } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { RiMenu3Fill } from "react-icons/ri";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../Logo";
import Socials from "../Socials";

const links = [
	{ name: "about", path: "/about", scroll: false },
	{ name: "get started", path: "get_started", scroll: true },
	{ name: "faq", path: "faq", scroll: true },
];

const GuestHeaderMobile = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger
				className="text-black flex items-center justify-center text-3xl"
				onClick={() => setIsOpen(true)}
			>
				<RiMenu3Fill />
			</SheetTrigger>

			<SheetContent className="bg-primary border-none text-black">
				<div className="flex flex-col pt-16 pb-8 items-center justify-between h-full">
					<SheetHeader>
						<SheetTitle>
							<Logo />
						</SheetTitle>
						<SheetDescription className="sr-only">
							Navigation Menu
						</SheetDescription>
					</SheetHeader>

					<ul className="w-full flex flex-col gap-14 justify-center text-center">
						{links.map((link, index) => (
							<li
								key={index}
								className="text-black uppercase font-primary font-medium tracking-[1.2px]"
							>
								{link.scroll ? (
									<ScrollLink
										to={link.path}
										smooth
										spy
										duration={500}
										className="cursor-pointer"
										activeClass="text-orange-accent-500"
										onClick={() => setIsOpen(false)}
									>
										{link.name}
									</ScrollLink>
								) : (
									<Link
										href={link.path}
										className="cursor-pointer hover:text-orange-accent-500"
										onClick={() => setIsOpen(false)}
									>
										{link.name}
									</Link>
								)}
							</li>
						))}
					</ul>

					<Socials containerStyles="text-black text-xl flex gap-6" />
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default GuestHeaderMobile;
