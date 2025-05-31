"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import { getServiceById, Service } from "@/lib/clients/ViewServiceClient";
import ServiceOverview from "@/components/services/view/ServiceDetails/ServiceOverview";
import ServicePayment from "@/components/services/view/ServiceDetails/ServicePayment";
import ServiceSettings from "@/components/services/view/ServiceDetails/ServiceSettings";

const EditPage = () => {
	const router = useRouter();
	const pathname = usePathname();
	const serviceId = pathname.split("/")[2];

	const [activeTab, setActiveTab] = useState<
		"Overview" | "Payment" | "Settings"
	>("Overview");
	const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
	const isLargeScreen = useMediaQuery("(min-width: 1280px)");

	const [serviceInfo, setServiceInfo] = useState<Service | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchServiceInfo = async () => {
			if (!serviceId) return;
			setLoading(true);
			const data = await getServiceById(serviceId);
			if (data) setServiceInfo(data);
			setLoading(false);
		};
		fetchServiceInfo();
	}, [serviceId]);

	const handleTabChange = (tab: typeof activeTab) => {
		setActiveTab(tab);
		setShowMobileSwitcher(false);
	};

	const TAB_LABELS = {
		Overview: "Overview",
		Payment: "Payment",
		Settings: "Settings",
	};

	const TAB_COMPONENTS = {
		Overview: (
			<ServiceOverview service={serviceInfo} setService={setServiceInfo} />
		),
		Payment: (
			<ServicePayment service={serviceInfo} setService={setServiceInfo} />
		),
		Settings: (
			<ServiceSettings service={serviceInfo} setService={setServiceInfo} />
		),
	};

	return (
		<div className="flex flex-col relative w-full justify-center gap-6">
			{loading ? (
				<div className="flex flex-col gap-4 p-8 items-center justify-center">
					<p className="text-gray-500">Getting service details...</p>
				</div>
			) : (
				<>
					<div className="flex flex-col gap-2">
						<div className="flex flex-row items-center text-sm gap-3">
							<div
								className="flex flex-row items-center gap-3 hover:text-secondary cursor-pointer"
								onClick={() => router.push(`/services/`)}
							>
								<RiArrowLeftLine />
								Back to Service Desk
							</div>
							<div
								className="flex flex-row items-center gap-3 hover:text-secondary cursor-pointer"
								onClick={() =>
									router.push(`/services/${serviceInfo?.id}/request`)
								}
							>
								/ {serviceInfo?.title}
							</div>
							<div className="text-black">/ Edit</div>
						</div>
					</div>

					<div className="main flex flex-col xl:flex-row items-start w-full max-w-[1440px] mx-auto gap-6 xl:gap-20">
						{!isLargeScreen && (
							<div className="flex w-fit gap-4 items-center relative mx-6 px-2">
								<h1 className="text-2xl font-semibold">
									{TAB_LABELS[activeTab]}
								</h1>
								<button onClick={() => setShowMobileSwitcher((prev) => !prev)}>
									<ChevronDown className="w-6 h-6" />
								</button>
								{showMobileSwitcher && (
									<TabSwitcher
										tabComponents={TAB_COMPONENTS}
										tabLabels={TAB_LABELS}
										defaultTab="Overview"
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
								defaultTab="Overview"
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
				</>
			)}
		</div>
	);
};

export default EditPage;
