"use client";
import React from "react";

import { useState } from "react";
import RequestSidebar from "@/components/services/request/RequestSidebar";
import ManageRequests from "@/components/services/request/ManageRequest";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";

const RequestPage = () => {
	const [activeTab, setActiveTab] = useState("Pending");

	return (
		<div>
			<div className="fixed top-16 sm:left-18 right-0 flex z-20 items-center gap-2 pb-4 text-sm text-muted-foreground bg-white w-full py-2 sm:px-12 px-4">
				<Link href="/services" className="flex items-center gap-1">
					<RiArrowLeftLine className="text-lg" />
					<span className="hover:text-secondary">Services</span>
				</Link>
				<span>/</span>
				<Link href={`/services/1/request`} className="flex items-center gap-1">
					<span className="text-secondary">Request</span>
				</Link>
			</div>

			<div className="flex flex-col sm:flex-row sm:gap-4 gap-2 pb-20 mt-9">
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
					{activeTab === "Canceled" && (
						<ManageRequests statusFilter="Canceled" />
					)}
				</div>
			</div>
		</div>
	);
};

export default RequestPage;
