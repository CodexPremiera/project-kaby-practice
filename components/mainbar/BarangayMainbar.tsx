"use client";

import {
	RiCommunityLine,
	RiServiceLine,
	RiTableLine,
	RiSettings4Line
} from "react-icons/ri";
import MainbarItem from "@/components/mainbar/MainbarItem";
import { usePathname } from "next/navigation";

interface BarangayProps {
	role: string | null;
}

const BarangayMainbar = ({ role }: BarangayProps) => {
	const pathname = usePathname();

	const filtered_nav = [
		{ name: "Home", path: "/home", icon: RiCommunityLine },
	];

	if (role === "Service Manager") {
		filtered_nav.push({ name: "Your Services", path: "/services", icon: RiServiceLine });
	} else if (role === "Citizen Manager") {
		filtered_nav.push({ name: "Citizen Desk", path: "/citizen_desk", icon: RiTableLine });
	} else if(role === "barangay" || role === "Chief Operator"){
		filtered_nav.push({ name: "Your Services", path: "/services", icon: RiServiceLine });
		filtered_nav.push({ name: "Citizen Desk", path: "/citizen_desk", icon: RiTableLine });
		filtered_nav.push({ name: "Settings", path: "/account", icon: RiSettings4Line });

	}

	return (
		<div className="mainbar">
			{filtered_nav.map((item) => (
				<MainbarItem key={item.path} {...item} pathname={pathname} />
			))}
		</div>
	);
};

export default BarangayMainbar;
