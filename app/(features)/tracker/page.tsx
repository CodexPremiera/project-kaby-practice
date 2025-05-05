"use client";
import React from "react";

import { useState } from "react";
import RequestSidebar from "@/components/services/request/RequestSidebar";
import ManageRequests from "@/components/services/request/ManageRequest";
import TrackService from "@/components/tracker/TrackService";
import TrackerSidebar from "@/components/tracker/TrackerSidebar";

const Tracker = () => {
	const [activeTab, setActiveTab] = useState("Pending");

	return (
		<div className="flex flex-col sm:flex-row sm:gap-4 gap-2 pb-20">
			{/* Sidebar */}
			<div className="flex-1 w-full">
				<TrackerSidebar activeTab={activeTab} onSelectTab={setActiveTab} />
			</div>

			{/* Content area */}
			<div className="flex-4 w-full">
				{/* Switch content dynamically based on the activeTab */}
				{activeTab === "Pending" && <TrackService statusFilter="Pending" />}
				{activeTab === "Ongoing" && <TrackService statusFilter="Ongoing" />}
				{activeTab === "Completed" && <TrackService statusFilter="Completed" />}
				{activeTab === "Canceled" && <TrackService statusFilter="Canceled" />}
			</div>
		</div>
	);
};

export default Tracker;
