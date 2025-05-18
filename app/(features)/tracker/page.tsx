"use client";
import React from "react";

import { useState } from "react";
import TrackService from "@/components/tracker/TrackService";
import TrackerSidebar from "@/components/tracker/TrackerSidebar";
import {useMediaQuery} from "@/app/hooks/useMediaQuery";
import {ChevronDown} from "lucide-react";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";

const TAB_COMPONENTS = {
	Pending: <TrackService statusFilter="Pending" />,
	Ongoing: <TrackService statusFilter="Ongoing" />,
	Completed: <TrackService statusFilter="Completed" />,
	Canceled: <TrackService statusFilter="Canceled" />
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	Pending: "Pending",
	Ongoing: "Ongoing",
	Completed: "Completed",
	Canceled: "Canceled"
};

const Tracker = () => {
	const [activeTab, setActiveTab] = useState<keyof typeof TAB_COMPONENTS>("Identity");
	const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
	const isLargeScreen = useMediaQuery("(min-width: 1024px)");

	const handleTabChange = (tab: keyof typeof TAB_COMPONENTS) => {
		setActiveTab(tab);
		setShowMobileSwitcher(false); // Auto-close mobile tab switcher
	};


	return (
		<div className="flex relative w-full justify-center">
			<div className="main flex flex-col lg:flex-row items-start w-full max-w-[1440px] mx-auto gap-6 lg:gap-20">
				{!isLargeScreen && (
					<div className="flex w-fit gap-4 items-center relative mx-6 px-2">
						<h1 className="text-2xl font-semibold">{TAB_LABELS[activeTab]}</h1>

						<button onClick={() => setShowMobileSwitcher(prev => !prev)}>
							<ChevronDown className="w-6 h-6"/>
						</button>

						{showMobileSwitcher && (
							<TabSwitcher
								tabComponents={TAB_COMPONENTS}
								tabLabels={TAB_LABELS}
								defaultTab={"Pending"}
								className="flex w-[200px] flex-col flex-shrink-0 absolute bottom-0 right-0 translate-y-full background-1 p-4 rounded-xl drop-shadow-xl items-start gap-6"
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
						defaultTab={"Pending"}
						className="flex flex-col flex-shrink-0 sticky top-0 justify-center items-start gap-6 w-fit pt-4"
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
				)}

				<div
					className="flex flex-col gap-6 w-full background-1 rounded-2xl sm:rounded-3xl border border-light-color p-6 rounded-xl ">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default Tracker;
