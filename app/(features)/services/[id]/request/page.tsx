"use client";
import React from "react";
import ServiceTab from "@/components/services/ServiceTab";

import { useState } from "react";
import RequestSidebar from "@/components/services/request/RequestSidebar";
import ManageRequests from "@/components/services/request/ManageRequest";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";

const RequestPage = () => {
	const [activeTab, setActiveTab] = useState("Pending");

	return (
		<div className="flex flex-col sm:flex-row sm:gap-4 gap-2 pb-20">
			{/* Sidebar */}
			<div className="flex-1 w-full">
				<RequestSidebar activeTab={activeTab} onSelectTab={setActiveTab} />
			</div>

			{/* Content area */}
			<div className="flex-4 w-full">
				{/* Switch content dynamically based on the activeTab */}
				{activeTab === "Pending" && <ManageRequests statusFilter="Pending" />}
				{activeTab === "Ongoing" && <ManageRequests statusFilter="Ongoing" />}
				{activeTab === "Completed" && (
					<ManageRequests statusFilter="Completed" />
				)}
				{activeTab === "Canceled" && <ManageRequests statusFilter="Canceled" />}
			</div>
		</div>
	);
};

export default RequestPage;
