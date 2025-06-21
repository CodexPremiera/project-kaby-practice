"use client";

import React, { JSX, useEffect, useState } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { ChevronDown } from "lucide-react";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import TrackService from "@/components/tracker/TrackService";
import { useCitizenContext } from "@/app/context/CitizenContext";
import { ServiceRequest } from "@/lib/clients/RequestServiceClient";

const TABS = ["Pending", "Ongoing", "Completed", "Canceled"] as const;
type TabType = (typeof TABS)[number];

const Tracker = () => {
	const [activeTab, setActiveTab] = useState<TabType>("Pending");
	const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
	const isLargeScreen = useMediaQuery("(min-width: 1280px)");

	const [counts, setCounts] = useState<Record<TabType, number>>({
		Pending: 0,
		Ongoing: 0,
		Completed: 0,
		Canceled: 0,
	});

	const [allRequests, setAllRequests] = useState<ServiceRequest[]>([]);

	const customerId = useCitizenContext().citizenId;

	// Fetch all requests once
	const fetchAllRequests = async () => {
		if (!customerId) return;
		try {
			const res = await fetch(`/api/tracker/${customerId}`);
			if (!res.ok) throw new Error("Failed to fetch requests");
			const { requests } = await res.json();
			setAllRequests(requests);

			// Calculate counts by status
			const newCounts: Record<TabType, number> = {
				Pending: 0,
				Ongoing: 0,
				Completed: 0,
				Canceled: 0,
			};
			requests.forEach((req: ServiceRequest) => {
				if (TABS.includes(req.status as TabType)) {
					newCounts[req.status as TabType]++;
				}
			});
			setCounts(newCounts);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchAllRequests();
	}, [customerId]);

	const handleTabChange = (tab: TabType) => {
		setActiveTab(tab);
		setShowMobileSwitcher(false);
	};

	const updateCount = (status: TabType, count: number) => {
		setCounts((prev) => {
			if (prev[status] === count) return prev;
			return { ...prev, [status]: count };
		});
	};
	const filteredRequestsByStatus: Record<TabType, ServiceRequest[]> = {
		Pending: allRequests.filter((r) => r.status === "Pending"),
		Ongoing: allRequests.filter((r) => r.status === "Ongoing"),
		Completed: allRequests.filter((r) => r.status === "Completed"),
		Canceled: allRequests.filter((r) => r.status === "Canceled"),
	};

	const TAB_COMPONENTS: Record<TabType, JSX.Element> = {
		Pending: (
			<TrackService
				statusFilter="Pending"
				onCountChange={(count) => updateCount("Pending", count)}
				initialRequests={filteredRequestsByStatus["Pending"]}
			/>
		),
		Ongoing: (
			<TrackService
				statusFilter="Ongoing"
				onCountChange={(count) => updateCount("Ongoing", count)}
				initialRequests={filteredRequestsByStatus["Ongoing"]}
			/>
		),
		Completed: (
			<TrackService
				statusFilter="Completed"
				onCountChange={(count) => updateCount("Completed", count)}
				initialRequests={filteredRequestsByStatus["Completed"]}
			/>
		),
		Canceled: (
			<TrackService
				statusFilter="Canceled"
				onCountChange={(count) => updateCount("Canceled", count)}
				initialRequests={filteredRequestsByStatus["Canceled"]}
			/>
		),
	};

	const TAB_LABELS: Record<TabType, string> = {
		Pending: "Pending",
		Ongoing: "Ongoing",
		Completed: "Completed",
		Canceled: "Canceled",
	};

	return (
		<div className="flex flex-col relative w-full justify-center gap-6">
			<div className="main flex flex-col xl:flex-row items-start w-full max-w-[1440px] mx-auto gap-6 xl:gap-20">
				{/* Mobile Switcher */}
				{!isLargeScreen && (
					<div className="flex w-fit gap-4 items-center relative mx-6 px-2">
						<h1 className="text-2xl font-semibold">
							{TAB_LABELS[activeTab]} ({counts[activeTab]})
						</h1>
						<button onClick={() => setShowMobileSwitcher((prev) => !prev)}>
							<ChevronDown className="w-6 h-6" />
						</button>
						{showMobileSwitcher && (
							<TabSwitcher
								tabComponents={TAB_COMPONENTS}
								tabLabels={TAB_LABELS}
								tabCounts={counts}
								defaultTab="Pending"
								className="flex w-[200px] flex-col absolute bottom-0 left-0 translate-y-full background-1 p-4 rounded-xl drop-shadow-xl items-start gap-6 z-10"
								activeTab={activeTab}
								setActiveTab={handleTabChange}
							/>
						)}
					</div>
				)}

				{/* Desktop Tabs */}
				{isLargeScreen && (
					<TabSwitcher
						tabComponents={TAB_COMPONENTS}
						tabLabels={TAB_LABELS}
						tabCounts={counts}
						defaultTab="Pending"
						className="flex flex-col sticky top-0 gap-6 w-fit pt-4"
						activeTab={activeTab}
						setActiveTab={handleTabChange}
					/>
				)}

				{/* Tab Content */}
				<div className="w-full px-4">
					<div className="flex flex-col gap-6 w-full background-1 sm:rounded-3xl border border-light-color p-2 lg:p-4 xl:p-6 rounded-xl mb-10">
						{TAB_COMPONENTS[activeTab]}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tracker;
