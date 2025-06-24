"use client";

import React, { useEffect, useState } from "react";
import ButtonTab from "@/components/ui/tabs/ButtonTab";
import ServiceSearchBar from "@/components/services/ServiceSearchBar";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import { useSearchParams, useRouter } from "next/navigation";
import YourServicesList from "@/components/services/view/YourServicesList";
import CitizenProfileTab from "@/components/profile/CitizenProfileTab";

const TAB_KEYS = ["active", "closed"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const TAB_LABELS: Record<TabKey, string> = {
	active: "Active",
	closed: "Closed",
};

const ServiceDesk = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const tabParam = searchParams.get("stab") as TabKey | null;
	const defaultTab =
		tabParam && TAB_KEYS.includes(tabParam) ? tabParam : "active";

	const [activeTab, setActiveTab] = useState<TabKey>(defaultTab);

	const changeTab = (tab: TabKey) => {
		if (tab !== activeTab) {
			setActiveTab(tab);
			const params = new URLSearchParams(window.location.search);
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
		<>
			<CitizenProfileTab />
			<div className="flex flex-col w-full max-w-[1280px] mx-auto gap-8">
				<div className="flex flex-col w-full min-h-[600px] background-1 rounded-2xl sm:rounded-3xl border border-light-color p-6 md:p-8 gap-6">
					<div className="flex flex-col mb-4 gap-2">
						<h1 className="text-lg font-semibold">Service Desk</h1>
						<p className="text-sm">
							Manage your services and provide the best experience to your
							clients.
						</p>
					</div>

					<div className="flex flex-col-reverse gap-6 lg:flex-row lg:justify-between lg:items-center">
						<nav className="flex w-full gap-2 overflow-x-auto no-scrollbar px-4">
							{TAB_KEYS.map((tab) => (
								<ButtonTab
									key={tab}
									onClick={() => changeTab(tab)}
									active={activeTab === tab}
									className="text-sm"
								>
									{TAB_LABELS[tab]}
								</ButtonTab>
							))}
						</nav>

						<div className="flex gap-2 items-center w-full px-4">
							<ServiceSearchBar />
							<ButtonPrimary onClick={() => router.push(`/services/create`)}>
								+ Add New
							</ButtonPrimary>
						</div>
					</div>

					<div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center py-4 px-4">
						<YourServicesList tab={activeTab} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ServiceDesk;
