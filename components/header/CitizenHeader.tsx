"use client";

import Logo from "../Logo";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import {LogoutToggle} from "@/components/header/logout/LogoutToggle";

const CitizenHeader = () => {
	return (
		<header
			className="h-[65px] fixed background-1 top-0 w-screen px-4 sm:px-6 flex items-center justify-between z-20 py-8">
			<div className="flex items-center gap-1 select-none cursor-pointer">
				<Logo/>
				<div className="flex items-center gap-2">
					<span className="italic">for Citizens</span>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className="flex">
					<Link href="/profile" className="flex items-center gap-2">
						<LogoutToggle/>
						<span className="hidden sm:inline text-sm font-medium">
							Bondy Might
						</span>
					</Link>
				</div>
				<ModeToggle/>
			</div>
		</header>
	);
};

export default CitizenHeader;
