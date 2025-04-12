"use client";

import { useState } from "react";
import Dashboard from "./Dashboard";
import CitizenVerification from "./CitizenVerification";
import BadgeRequest from "./BadgeRequest";
import ReportedUser from "./ReportedUser";

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
		<div className="h-full flex flex-col ">
			<nav className="fixed flex  w-full bg-white gap-6 pl-3  border-b border-gray-200">
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

			<div className="flex-1 p-4 my-12 overflow-y-auto justify-center items-center">
				{TAB_COMPONENTS[activeTab]}
			</div>
		</div>
	);
};

export default CitizenDesk;
