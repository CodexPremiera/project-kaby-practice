"use client";

import {
	RiAlarmWarningLine,
	RiCommunityLine,
	RiServiceLine,
	RiSettings4Line,
} from "react-icons/ri";
import MainbarItem from "@/components/mainbar/MainbarItem";
import {usePathname} from "next/navigation";

const nav_items = [
	{ name: "Home", path: `/home`, icon: RiCommunityLine },
	{ name: "Your Services", path: `/services`, icon: RiServiceLine },
	{ name: "Tracker", path: `/tracker`, icon: RiAlarmWarningLine },
	{ name: "Settings", path: `/account`, icon: RiSettings4Line },
];

const CitizenMainbar = () => {
	const pathname = usePathname();

	return (
		<div className="mainbar">
			{nav_items.map((item) => (
				<MainbarItem key={item.path} {...item} pathname={pathname} />
			))}
		</div>
	)
};

export default CitizenMainbar;