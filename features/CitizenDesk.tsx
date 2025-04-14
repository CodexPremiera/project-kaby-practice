"use client";

import { useState } from "react";
import Dashboard from "@/components/citizen_desk/Dashboard";
import CitizenVerification from "@/components/citizen_desk/CitizenVerification";
import BadgeRequest from "@/components/citizen_desk/BadgeRequest";
import ReportedUser from "@/components/citizen_desk/ReportedUser";

const TAB_COMPONENTS = {
	Dashboard: <Dashboard />,
	CitizenVerification: <CitizenVerification />,
	BadgeRequest: <BadgeRequest />,
	ReportedUser: <ReportedUser />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	Dashboard: "Dashboard",
	CitizenVerification: "Citizen Verification",
	BadgeRequest: "Badge Request",
	ReportedUser: "Reported User",
};

const CitizenDesk = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("Dashboard");

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

export default CitizenDesk;
