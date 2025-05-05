"use client";

import ServiceTab from "../ServiceTab";
import { services } from "@/data/services";

const NAVIGATION_ITEMS = [
	{ title: "Pending", key: "Pending" },
	{ title: "Ongoing", key: "Ongoing" },
	{ title: "Completed", key: "Completed" },
	{ title: "Canceled", key: "Canceled" },
];

interface RequestSidebarProps {
	activeTab: string;
	onSelectTab: (tab: string) => void;
}

const RequestSidebar: React.FC<RequestSidebarProps> = ({
	activeTab,
	onSelectTab,
}) => {
	return (
		<div className="flex flex-col sm:fixed bg-white p-4 sm:rounded-[10px] rounded-[0px] sm:w-[216px] sm:h-screen w-full">
			<ServiceTab service={services[0]} />

			{/* Navigation */}
			<nav className="flex flex-wrap sm:flex-col gap-2 sm:gap-4 mt-4 w-full">
				<div className="flex flex-row sm:flex-col w-full sm:w-auto gap-2 sm:gap-4">
					{NAVIGATION_ITEMS.map((item) => {
						const isActive = activeTab === item.key;

						return (
							<button
								key={item.key}
								onClick={() => onSelectTab(item.key)}
								className={`${
									isActive ? "bg-secondary " : "hover:bg-secondary/10"
								} transition duration-200 flex sm:justify-start items-center justify-center rounded-xl py-2 px-3 h6 w-full sm:w-auto text-sm`}
							>
								<span className={isActive ? "text-white" : "text-black"}>
									{item.title}
								</span>
							</button>
						);
					})}
				</div>
			</nav>
		</div>
	);
};

export default RequestSidebar;
