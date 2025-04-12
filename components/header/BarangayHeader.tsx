"use client";

import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";
import { RiUser3Line } from "react-icons/ri";
import Link from "next/link";
import SearchBar from "../search/SearchBar";

const BarangayHeader = () => {
	return (
		<header className="h-[65px] flex justify-between items-center border-b border-gray/20 bg-white">
			<div className="flex">
				<Logo />
			</div>
			<div className="flex gap-6 mx-8">
				<SearchBar />
				<div>
					<Button variant="barangay">Barangay</Button>
				</div>
				<ModeToggle />
				<Link href="/profile">
					<Button variant="outline" size="icon">
						<RiUser3Line className="text-black" />
					</Button>
				</Link>
			</div>
		</header>
	);
};

export default BarangayHeader;
