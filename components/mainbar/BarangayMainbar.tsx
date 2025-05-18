import {
	RiCommunityLine,
	RiServiceLine,
	RiSettings4Line,
	RiTableLine,
} from "react-icons/ri";
import MainbarItem from "@/components/mainbar/MainbarItem";

const nav_items = [
	{ name: "Home", path: "/home", icon: RiCommunityLine },
	{ name: "Citizen Desk", path: "/citizen_desk", icon: RiTableLine },
	{ name: "Your Services", path: "/services", icon: RiServiceLine },
	{ name: "Settings", path: "/settingss", icon: RiSettings4Line },
];

const BarangayMainbar = () => (
	<div className="mainbar">
		{nav_items.map((item) => (
			<MainbarItem key={item.path} {...item} />
		))}
	</div>
);

export default BarangayMainbar;
