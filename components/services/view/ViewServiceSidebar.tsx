"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ViewServiceSidebarProps {
	serviceId: string;
}

const ViewServiceSidebar: React.FC<ViewServiceSidebarProps> = ({
	serviceId,
}) => {
	const pathname = usePathname();

	const NAVIGATION_ITEMS = [
		{ title: "Overview", path: `/services/${serviceId}` },
		{ title: "Requirements", path: `/services/${serviceId}/requirements` },
		{ title: "Payment", path: `/services/${serviceId}/payment` },
	];

	return (
		<nav className="flex  bg-white w-full sm:w-[216px] sm:h-[550px] sm:flex-col sm:space-y-4 space-x-4 sm:space-x-0 p-4 rounded-[10px]">
			{NAVIGATION_ITEMS.map((item) => {
				const isActive = pathname === item.path;

				return (
					<Link
						key={item.title}
						href={item.path}
						className={`${
							isActive ? "bg-secondary" : "hover:bg-secondary/10"
						} transition duration-200 flex items-center justify-center sm:justify-start space-x-2 rounded-xl py-2 px-3 w-full sm:w-auto text-sm`}
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

export default ViewServiceSidebar;
