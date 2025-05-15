import {
	RiCommunityLine,
	RiServiceLine,
	RiSettings4Line,
	RiTableLine,
} from "react-icons/ri";
import MainbarItem from "@/components/mainbar/MainbarItem";

const nav_items = [
	{ name: "Home", path: "/barangay/home", icon: RiCommunityLine },
	{ name: "Citizen Desk", path: "/barangay/citizens_desk", icon: RiTableLine },
	{ name: "Your Services", path: "/barangay/services", icon: RiServiceLine },
	{ name: "Settings", path: "/barangay/settings", icon: RiSettings4Line },
];

const BarangayMainbar = () => (
	<div className="mainbar">
		{nav_items.map((item) => (
			<MainbarItem key={item.path} {...item} />
		))}
	</div>
);

export default BarangayMainbar;