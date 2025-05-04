"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_ITEMS = [
	{ title: "Dashboard", path: "/citizen_desk" },
	{ title: "Account Verification", path: "/citizen_desk/account_verify" },
	{ title: "Badge Requests", path: "/citizen_desk/badge_requests" },
	{ title: "Reported Users", path: "/citizen_desk/reported_users" },
];

const CitizenDeskSidebar = () => {
	const pathname = usePathname();

	return (
		<nav className="flex sm:fixed bg-white w-full sm:w-[216px] sm:h-screen sm:flex-col sm:space-y-4 space-x-4 sm:space-x-0 p-4 rounded-[10px]">
			{NAVIGATION_ITEMS.map((item) => {
				const isActive = pathname === item.path;

				return (
					<Link
						key={item.title}
						href={item.path}
						className={`${
							isActive ? "bg-secondary text-white" : "hover:bg-secondary/10"
						} transition duration-200 flex items-center justify-center sm:justify-start space-x-2 rounded-xl py-2 px-3 w-full sm:w-auto h6`}
					>
						<span className={isActive ? "text-white" : "text-black"}>
							{item.title}
						</span>
					</Link>
				);
			})}
		</nav>
	);
};

export default CitizenDeskSidebar;
