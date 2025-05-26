"use client";

import {
	RiAlarmWarningLine,
	RiCommunityLine,
	RiServiceLine,
	RiSettings2Fill,
	RiSettings4Line,
	RiAccountPinBoxLine,
} from "react-icons/ri";
import MainbarItem from "@/components/mainbar/MainbarItem";
import {usePathname} from "next/navigation";
import { useCitizenContext } from "@/app/context/CitizenContext";


const CitizenMainbar = () => {
	const pathname = usePathname();
	const {access_role} = useCitizenContext();
	console.log("this is the access rolezzz", access_role);
	const base_nav_items = [
		{ name: "Home", path: `/home`, icon: RiCommunityLine },
		{ name: "Your Services", path: `/services`, icon: RiServiceLine },
		{ name: "Tracker", path: `/tracker`, icon: RiAlarmWarningLine },
		{ name: "Settings", path: `/account`, icon: RiSettings4Line },
	];

	// Add /citizen_desk only if role is "Citizen Manager"
	if (access_role === "Citizen Manager") {
		base_nav_items.push({
			name: "Citizen Desk",
			path: `/citizen_desk`,
			icon: RiAccountPinBoxLine,
		});
	}
	return (
		<div className="mainbar">
			{base_nav_items.map((item) => (
				<MainbarItem key={item.path} {...item} pathname={pathname} />
			))}
		</div>
	)
};

export default CitizenMainbar;