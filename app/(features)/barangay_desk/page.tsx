"use client";

import { useState } from "react";
import BarangayAppointment from "@/components/barangay_desk/BarangayAppointment";
import ApproveAccount from "@/components/barangay_desk/ApproveAccount";

const TAB_COMPONENTS = {
	Pending: <BarangayAppointment />,
	"Approved Accounts": <ApproveAccount />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	Pending: "Pending",
	"Approved Accounts": "Approved Accounts",
};

const BarangayDesk = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("Pending");

	return (
		<div className="flex flex-col w-full">
			<div className="relative flex flex-col w-full min-h-screen">
				<nav className="fixed top-16 sm:left-16 z-2 bg-white flex gap-6 pl-8 border-b border-gray-200 w-full">
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
				<div className="flex-1 justify-center overflow-y-auto items-center mt-8">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default BarangayDesk;
