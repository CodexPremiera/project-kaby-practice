"use client";

import {
	RiCommunityLine,
	RiDashboard2Line,
	RiDashboard3Line,
	RiDashboardLine,
	RiInboxLine,
	RiSettings4Line,
	RiTableLine,
	RiUser3Line,
} from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMainbar = () => {
	const pathname = usePathname();

	const links = [
		{ name: "Dashboard", path: `/admin` },
		{ name: "Barangay Desk", path: `/admin/barangay_desk` },
		{ name: "Settings", path: `/admin/account` },
	];

	const mobileOnlyLinks = [{ name: "Profile", path: "/profile" }];

	const isLinkActive = (linkPath: string) => pathname === linkPath;

	const renderLink = (
		link: { name: string; path: string },
		isMobileOnly = false
	) => {
		const isActive = isLinkActive(link.path);
		const iconColor = isActive ? "text-secondary" : "text-black";

		return (
			<Link key={link.path} href={link.path}>
				<div
					className={`relative flex flex-col items-center justify-center px-3 py-3 cursor-pointer group transition-all duration-300 hover:bg-gray/30 rounded-[10px] ${
						isMobileOnly ? "sm:hidden" : ""
					}`}
				>
					{link.name === "Dashboard" && (
						<RiDashboardLine className={`w-6 h-6 ${iconColor}`} />
					)}
					{link.name === "Barangay Desk" && (
						<RiCommunityLine className={`w-6 h-6 ${iconColor}`} />
					)}
					{link.name === "Settings" && (
						<RiSettings4Line className={`w-6 h-6 ${iconColor}`} />
					)}
					{link.name === "Profile" && (
						<RiUser3Line className={`w-6 h-6 ${iconColor}`} />
					)}

					<p className="sm:hidden text-[11px] mt-1 whitespace-nowrap">
						{link.name}
					</p>
					<span className="hidden sm:block sm:absolute sm:left-full sm:ml-2 sm:text-black sm:text-[12px] sm:text-center sm:group-hover:text-white sm:group-hover:bg-black sm:px-2 sm:py-1 sm:rounded-lg sm:opacity-0 sm:group-hover:opacity-100 sm:transition-all sm:duration-300 whitespace-nowrap">
						{link.name}
					</span>
				</div>
			</Link>
		);
	};

	return (
		<div className="z-10 fixed left-0 bottom-0 w-full h-[75px] sm:w-[75px] sm:h-full sm:flex-col flex flex-row justify-between items-center px-2 sm:px-0 shadow-md rounded-[20px] bg-white text-black">
			<div className="flex flex-1 w-full sm:flex-col flex-row sm:justify-around justify-between sm:items-center items-end py-16 px-4 sm:px-0">
				{links.map((link) => renderLink(link))}
				{mobileOnlyLinks.map((link) => renderLink(link, true))}
			</div>
		</div>
	);
};

export default AdminMainbar;
