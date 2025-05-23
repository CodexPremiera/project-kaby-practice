"use client";

import React, { useEffect, useState } from "react";
import ServicesList from "@/components/services/ServicesList";
import ButtonTab from "@/components/ui/tabs/ButtonTab";
import { useRouter, useSearchParams } from "next/navigation";
import ServiceSearchBar from "@/components/services/ServiceSearchBar";

const TAB_COMPONENTS = {
	all: [],
	frontline: ["Barangay"],
	"around-you": ["Personal", "Event"],
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	all: "All",
	frontline: "Frontline",
	"around-you": "Around you",
};

const Services = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const tabParam = searchParams.get("stab") as keyof typeof TAB_COMPONENTS;
	const defaultTab: keyof typeof TAB_COMPONENTS =
		tabParam && TAB_COMPONENTS[tabParam] ? tabParam : "all";

	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>(defaultTab);

	const changeTab = (tab: keyof typeof TAB_COMPONENTS) => {
		setActiveTab(tab);
		if (activeTab !== tab) {
			const params = new URLSearchParams(window.location.search);
			params.set("tab", "Services");
			params.set("stab", tab);
			params.delete("q");
			router.push(`?${params.toString()}`);
		}
	};

	useEffect(() => {
		if (tabParam && tabParam !== activeTab) {
			setActiveTab(tabParam);
		}
	}, [tabParam]);

	return (
		<div className="flex px-4">
			<div className="flex flex-col w-full min-h-[600px] background-1 rounded-2xl sm:rounded-3xl border border-light-color p-6 md:p-8 gap-6">
				<div className="flex flex-col-reverse gap-6 lg:flex-row lg:justify-between lg:items-center ">
					{/* Tabs */}
					<nav className="flex w-full gap-2 overflow-x-auto no-scrollbar">
						{(
							Object.keys(TAB_COMPONENTS) as (keyof typeof TAB_COMPONENTS)[]
						).map((tab) => (
							<ButtonTab
								key={tab}
								onClick={() => changeTab(tab)}
								active={activeTab === tab}
								className="text-sm"
							>
								{TAB_LABELS[tab as keyof typeof TAB_LABELS]}
							</ButtonTab>
						))}
					</nav>

					{/* Services */}
					<ServiceSearchBar />
				</div>

				{/* Results Content */}
				<div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center py-4">
					<ServicesList tab={activeTab} />
				</div>
			</div>
		</div>
	);
};

export default Services;
