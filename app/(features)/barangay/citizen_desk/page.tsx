"use client";

import { useState } from "react";
import BackTopSection from "@/components/BackTopSection";
import Dashboard from "../citizen_desk/Dashboard";
import CitizenVerification from "../citizen_desk/CitizenVerification";
import BadgeRequest from "../citizen_desk/BadgeRequest";
import ReportedUser from "../citizen_desk/ReportedUser";
import TopSection from "@/components/TopSection";

// Tab component map
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

const Account = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("Dashboard");

	return (
		<div className="flex-1 overflow-y-auto">
			<nav className="flex gap-6 pl-3 border-b border-gray-200">
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

			<div className="mt-4 mx-6">{TAB_COMPONENTS[activeTab]}</div>
		</div>
	);
};

export default Account;
