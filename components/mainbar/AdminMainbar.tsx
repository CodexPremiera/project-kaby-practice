"use client";

import { RiDashboardLine, RiSettings4Line } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_ITEMS = [
	{ name: "Barangay Desk", path: `/barangay_desk`, icon: RiDashboardLine },
	{ name: "Settings", path: `/account`, icon: RiSettings4Line },
];

const AdminMainbar = () => {
	const pathname = usePathname();

	return (
		<div className="z-10 fixed left-0 bottom-0 w-full sm:top-16 sm:bottom-0 sm:left-0 sm:w-[75px] sm:h-full flex sm:flex-col flex-row justify-center items-center px-2 sm:px-0 bg-white text-black">
			<div className="flex flex-1 w-full sm:flex-col flex-row sm:justify-start justify-around items-center sm:space-y-4 sm:pt-4 sm:pb-8 px-4 sm:px-0">
				{NAVIGATION_ITEMS.map((link) => {
					const Icon = link.icon;
					const isActive = pathname === link.path;

					return (
						<Link
							key={link.path}
							href={link.path}
							className="flex flex-col items-center justify-center px-3 py-3 mt-2 cursor-pointer group hover:bg-gray-100 rounded-[10px] transition-all duration-300"
						>
							<Icon
								className={`w-6 h-6 ${isActive ? "text-secondary" : "text-black"}`}
							/>
							<p className="sm:hidden text-[11px] mt-1 whitespace-nowrap">
								{link.name}
							</p>
							<span className="hidden sm:block sm:absolute sm:left-full sm:ml-2 sm:text-black sm:text-[12px] sm:text-center sm:group-hover:text-white sm:group-hover:bg-black sm:px-2 sm:py-1 sm:rounded-lg sm:opacity-0 sm:group-hover:opacity-100 sm:transition-all sm:duration-300 whitespace-nowrap">
								{link.name}
							</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default AdminMainbar;
