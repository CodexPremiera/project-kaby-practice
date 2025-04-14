"use client";

import { useState } from "react";
import Pending from "@/components/tracker/Pending";
import Ongoing from "@/components/tracker/Ongoing";
import Completed from "@/components/tracker/Completed";
import Canceled from "@/components/tracker/Canceled";
import Reported from "@/components/tracker/Reported";

const TAB_COMPONENTS = {
	Pending: <Pending />,
	Ongoing: <Ongoing />,
	Completed: <Completed />,
	Canceled: <Canceled />,
	Reported: <Reported />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	Pending: "Pending",
	Ongoing: "Ongoing",
	Completed: "Completed",
	Canceled: "Canceled",
	Reported: "Reported",
};

const Tracker = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("Pending");

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

export default Tracker;
