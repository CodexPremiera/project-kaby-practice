"use client";

import {
	RiCommunityLine,
	RiServiceLine,
	RiSettings4Line,
	RiTableLine,
} from "react-icons/ri";
import MainbarItem from "@/components/mainbar/MainbarItem";
import {usePathname} from "next/navigation";

const nav_items = [
	{ name: "Home", path: "/home", icon: RiCommunityLine },
	{ name: "Citizen Desk", path: "/citizen_desk", icon: RiTableLine },
	{ name: "Your Services", path: "/services", icon: RiServiceLine },
	{ name: "Settings", path: "/account", icon: RiSettings4Line },
];

const BarangayMainbar = () => {
	const pathname = usePathname();

	return (
		<div className="mainbar">
			{nav_items.map((item) => (
				<MainbarItem key={item.path} {...item} pathname={pathname}/>
			))}
		</div>
	)
};

export default BarangayMainbar;
