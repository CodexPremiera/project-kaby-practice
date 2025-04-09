"use client";

import {
	RiCommunityLine,
	RiHome4Line,
	RiServiceLine,
	RiSettings4Line,
} from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ name: "Home", path: "/barangay" },
	{ name: "Citizens", path: "/barangay/citizen_desk" },
	{ name: "Services", path: "/barangay/service_desk" },
	{ name: "Settings", path: "/barangay/account" },
];

const BarangayMainbar = () => {
	const pathname = usePathname();

	return (
		<div className="z-10 h-[75px] text-black sw-full p-4 fixed left-0 card-shadow-custom bottom-0 sm:w-[75px] sm:h-full sm:fixed sm:bottom-0 sm:left-0 sm:flex sm:flex-start flex flex-row justify-center items-center py-5 sm:flex-col">
			{links.map((link, index) => {
				const isActive = pathname === link.path;
				const iconColor = isActive ? "text-secondary" : "text-black";

				return (
					<Link key={index} href={link.path}>
						<div className="relative flex items-center px-3 py-3 cursor-pointer group transition-all duration-300 hover:bg-gray/30 rounded-[10px] m-6">
							<div className="flex flex-col sm:flex-row text-[13px] text-center justify-center items-center">
								{link.name === "Home" && (
									<RiHome4Line className={`w-6 h-6 ${iconColor}`} />
								)}
								{link.name === "Citizens" && (
									<RiCommunityLine className={`w-6 h-6 ${iconColor}`} />
								)}
								{link.name === "Services" && (
									<RiServiceLine className={`w-6 h-6 ${iconColor}`} />
								)}
								{link.name === "Settings" && (
									<RiSettings4Line className={`w-6 h-6 ${iconColor}`} />
								)}
								<p className="sm:hidden">{link.name}</p>
							</div>

							{/* Hover Text for large screens only */}
							<span className="hidden sm:block sm:absolute sm:left-full sm:ml-2 sm:text-black sm:text-[12px] sm:text-center sm:group-hover:text-white sm:group-hover:bg-black sm:px-2 sm:py-1 sm:rounded-lg sm:opacity-0 sm:group-hover:opacity-100 sm:transition-all sm:duration-300 whitespace-nowrap">
								{link.name}
							</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default BarangayMainbar;
