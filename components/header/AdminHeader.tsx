"use client";

import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";
import { RiAlarmWarningLine, RiUser3Line } from "react-icons/ri";
import Link from "next/link";
import SearchBar from "../search/SearchBar";

const AdminHeader = () => {
	return (
		<header className="h-[65px] flex justify-between items-center border-b border-gray/20 bg-white">
			<div className="flex">
				<Logo />
			</div>
			<div className="flex gap-6 mx-8">
				<ModeToggle />

				<div>
					<Button variant="barangay">Admin</Button>
				</div>
			</div>
		</header>
	);
};

export default AdminHeader;
