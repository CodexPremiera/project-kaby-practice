"use client";

import { useState } from "react";
import ActiveService from "@/components/service_desk/ActiveService";
import CompletedService from "@/components/service_desk/CompletedService";

const TAB_COMPONENTS = {
	Active: <ActiveService />,
	Completed: <CompletedService />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	Active: "Active",
	Completed: "Completed",
};

const ServiceDesk = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("Active");

	return (
		<div className="flex flex-col w-full">
			<div className="relative flex flex-col w-full min-h-screen">
				<nav className="sticky top-0 z-2 bg-white flex gap-6 pl-8 border-b border-gray-200">
					{Object.keys(TAB_COMPONENTS).map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab as keyof typeof TAB_COMPONENTS)}
							className={`text-sm px-4 py-3 border-b-2 transition-colors ${
								activeTab === tab
									? "border-secondary text-secondary"
									: "border-transparent text-gray-600 hover:text-secondary"
							}`}
						>
							{TAB_LABELS[tab as keyof typeof TAB_LABELS]}
						</button>
					))}
				</nav>

				{/* Main content area */}
				<div className="flex-1 justify-center overflow-y-auto items-center">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default ServiceDesk;
