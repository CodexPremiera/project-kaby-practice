"use client";
import React, { useState } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { ChevronDown } from "lucide-react";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import TrackService from "@/components/tracker/TrackService";

const Tracker = () => {
	const [activeTab, setActiveTab] = useState<
		"Pending" | "Ongoing" | "Completed" | "Canceled"
	>("Pending");
	const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
	const isLargeScreen = useMediaQuery("(min-width: 1280px)");

	const handleTabChange = (tab: typeof activeTab) => {
		setActiveTab(tab);
		setShowMobileSwitcher(false);
	};

	const TAB_LABELS = {
		Pending: "Pending",
		Ongoing: "Ongoing",
		Completed: "Completed",
		Canceled: "Canceled",
	};

	const TAB_COMPONENTS = {
		Pending: <TrackService statusFilter="Pending" />,
		Ongoing: <TrackService statusFilter="Ongoing" />,
		Completed: <TrackService statusFilter="Completed" />,
		Canceled: <TrackService statusFilter="Canceled" />,
	};

	return (
		<div className="flex flex-col relative w-full justify-center gap-6">
			<div className="main flex flex-col xl:flex-row items-start w-full max-w-[1440px] mx-auto gap-6 xl:gap-20">
				{!isLargeScreen && (
					<div className="flex w-fit gap-4 items-center relative mx-6 px-2">
						<h1 className="text-2xl font-semibold">{TAB_LABELS[activeTab]}</h1>
						<button onClick={() => setShowMobileSwitcher((prev) => !prev)}>
							<ChevronDown className="w-6 h-6" />
						</button>
						{showMobileSwitcher && (
							<TabSwitcher
								tabComponents={TAB_COMPONENTS}
								tabLabels={TAB_LABELS}
								defaultTab="Pending"
								className="flex w-[200px] flex-col absolute bottom-0 left-0 translate-y-full background-1 p-4 rounded-xl drop-shadow-xl items-start gap-6 z-10"
								activeTab={activeTab}
								setActiveTab={handleTabChange}
							/>
						)}
					</div>
				)}

				{isLargeScreen && (
					<TabSwitcher
						tabComponents={TAB_COMPONENTS}
						tabLabels={TAB_LABELS}
						defaultTab="Pending"
						className="flex flex-col sticky top-0 gap-6 w-fit pt-4"
						activeTab={activeTab}
						setActiveTab={handleTabChange}
					/>
				)}

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
