"use client";

import { useState } from "react";
import SearchBar from "@/components/home/search/SearchBar";
import ActiveService from "@/components/service_desk/ActiveService";
import ClosedService from "@/components/service_desk/ClosedService";
import { Button } from "@/components/ui/button";

const TAB_COMPONENTS = {
	active: <ActiveService />,
	closed: <ClosedService />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	active: "Active",
	closed: "Closed",
};

const ServiceDesk = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("active");

	return (
		<div className="flex flex-col w-full bg-white card-custom py-8">
			<div className="relative flex flex-col w-full min-h-screen px-4 sm:px-8">
				{/* Heading */}
				<div className="flex flex-col mb-4 gap-2">
					<div className="h5">Service Desk</div>
					<div className="text-sm">
						Manage your services and provide the best experience to your
						clients.
					</div>
				</div>

				{/* Tabs + Actions */}
				<div className="flex flex-col-reverse gap-4 py-2 sm:flex-row sm:justify-between sm:items-center">
					{/* Tabs */}
					<nav className="flex flex-wrap gap-2 sm:gap-4">
						{Object.keys(TAB_COMPONENTS).map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab as keyof typeof TAB_COMPONENTS)}
								className={`text-sm px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none ${
									activeTab === tab ? "btn-clicked" : "btn-default"
								}`}
							>
								{TAB_LABELS[tab as keyof typeof TAB_LABELS]}
							</button>
						))}
					</nav>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
						<Button variant="default" className="w-full sm:w-auto">
							+ Add New
						</Button>
						<SearchBar />
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto py-6 px-2 sm:px-4 md:px-8">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default ServiceDesk;
