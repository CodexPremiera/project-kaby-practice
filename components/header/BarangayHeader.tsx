	"use client";

import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";
import { RiUser3Line } from "react-icons/ri";
import Link from "next/link";

const BarangayHeader = () => {
	return (
		<header className="h-[65px] px-4 sm:px-6 flex items-center justify-between z-20 py-8">
			<div className="flex items-center gap-1 select-none cursor-pointer">
				<Logo />
				<div className="flex items-center gap-2">
					<span className="italic">for Barangays</span>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Link href="/barangay/profile" className="flex items-center gap-2">
					<span className="hidden sm:inline text-sm font-medium pr-2">
						Barangay Labangon
					</span>
				</Link>
				<ModeToggle />
			</div>
		</header>
	);
};

export default BarangayHeader;
