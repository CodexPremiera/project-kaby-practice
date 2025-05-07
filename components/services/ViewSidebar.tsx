"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CitizenDeskSidebarProps {
	serviceId: string;
}

const ViewSidebar: React.FC<CitizenDeskSidebarProps> = ({ serviceId }) => {
	const pathname = usePathname();

	const NAVIGATION_ITEMS = [
		{ title: "Overview", path: `/services/${serviceId}/overview` },
		{ title: "Payment", path: `/services/${serviceId}/payment` },
	];

	return (
		<nav className="flex sm:fixed bg-white w-full sm:w-[216px] sm:h-screen sm:flex-col sm:space-y-4 space-x-4 sm:space-x-0 p-4 card-custom">
			{NAVIGATION_ITEMS.map((item) => {
				const isActive = pathname === item.path;

				return (
					<Link
						key={item.title}
						href={item.path}
						className={`${
							isActive ? "bg-secondary" : "hover:bg-secondary/10"
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

export default ViewSidebar;
