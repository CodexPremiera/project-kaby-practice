"use client";

import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";
import { RiUser3Line } from "react-icons/ri";

const CitizenHeader = () => {
	return (
		<header className="h-[65px] sm:w-[95%] flex justify-between items-center border-b border-gray/20">
			<div className="flex">
				<Logo />
			</div>
			<div className="flex gap-6 mx-8">
				<div>
					<Button variant="citizen">Citizen</Button>
				</div>
				<ModeToggle />
				<Button variant="outline" size="icon">
					<RiUser3Line className="text-black" />
				</Button>
			</div>
		</header>
	);
};

export default CitizenHeader;
