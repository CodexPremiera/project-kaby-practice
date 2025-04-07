"use client";
import { useState } from "react";
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
	{ name: "about", path: "about" },
	{ name: "get started", path: "get_started" },
	{ name: "faq", path: "faq" },
];

const HeaderMobile = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger
				className="text-black flex items-center justify-center text-3xl"
				onClick={() => setIsOpen(true)}
			>
				<RiMenu3Fill />
			</SheetTrigger>
			<SheetContent className="bg-white-primary border-none text-black">
				<div className="flex flex-col pt16 pb-8 items-center justify-between h-full">
					<SheetHeader>
						<SheetTitle>
							<Logo />
						</SheetTitle>
						<SheetDescription className="sr-only">
							Navigation Menu
						</SheetDescription>
					</SheetHeader>
					<ul className="w-full flex flex-col gap-14 justify-center text-center">
						{links.map((link, index) => {
							return (
								<li
									key={index}
									className="text-black uppercase font-primary font-medium tracking-[1.2px]"
								>
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
								</li>
							);
						})}
					</ul>
					{/* socials */}
					<Socials containerStyles="text-black text-xl flex gap-6" />
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default HeaderMobile;
