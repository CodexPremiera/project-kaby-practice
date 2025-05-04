"use client";

import { useState } from "react";
import ActiveService from "@/components/services/your_services/ActiveService";
import ClosedService from "@/components/services/your_services/ClosedService";
import { Button } from "@/components/ui/button";
import { RiSearch2Line } from "react-icons/ri";
import CreateService from "@/components/services/CreateService";

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
	const [showCreateService, setShowCreateService] = useState(false);

	return (
		<div className="flex flex-col w-full min-h-screen gap-3">
			<div className="flex flex-col w-full">
				<div className="relative flex flex-col w-full min-h-screen ">
					<div className="bg-white px-4 sm:px-8 py-8 rounded-[20px]">
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
										onClick={() =>
											setActiveTab(tab as keyof typeof TAB_COMPONENTS)
										}
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
								<Button
									variant="default"
									className="w-full sm:w-auto"
									onClick={() => setShowCreateService(true)}
								>
									+ Add New
								</Button>
								<div className="flex items-center w-[350px] px-4 border border-gray-300 bg-white rounded-md">
									<RiSearch2Line className="text-gray-500 mr-2" />
									<input
										type="text"
										placeholder="Search for services"
										className="w-full focus:outline-none focus:ring-0 text-[14px] h-10"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-y-auto py-2 px-4 sm:px-8">
						{TAB_COMPONENTS[activeTab]}
					</div>
				</div>
			</div>

			{/* Create Service Modal */}
			{showCreateService && (
				<CreateService onClose={() => setShowCreateService(false)} />
			)}
		</div>
	);
};

export default ServiceDesk;
