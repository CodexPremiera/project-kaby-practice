"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { ChevronDown } from "lucide-react";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import ManageRequest from "@/components/services/request/ManageRequest";
import {
	RiArrowLeftBoxLine,
	RiArrowLeftLine,
	RiEditBoxLine,
	RiStarFill,
	RiUser2Fill,
} from "react-icons/ri";
import { usePathname } from "next/navigation";
import { getServiceById } from "@/lib/clients/ViewServiceClient";
import { getPublicUrl } from "@/utils/supabase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Request = () => {
	const router = useRouter();
	const pathname = usePathname();
	const serviceId = pathname.split("/")[2];

	const [activeTab, setActiveTab] = useState<
		"Pending" | "Ongoing" | "Completed" | "Canceled"
	>("Pending");
	const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
	const isLargeScreen = useMediaQuery("(min-width: 1280px)");

	const [serviceInfo, setServiceInfo] = useState<{
		service_title: string;
		service_ratings: number;
		service_avail: number;
		service_photo?: string;
	} | null>(null);

	useEffect(() => {
		const fetchServiceInfo = async () => {
			if (!serviceId) return;
			const data = await getServiceById(serviceId);
			if (data) {
				setServiceInfo({
					service_title: data.title,
					service_ratings: data.ratings,
					service_avail: data.no_of_avail,
					service_photo: data.image,
				});
			}
		};
		fetchServiceInfo();
	}, [serviceId]);

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
		Pending: <ManageRequest statusFilter="Pending" serviceId={serviceId} />,
		Ongoing: <ManageRequest statusFilter="Ongoing" serviceId={serviceId} />,
		Completed: <ManageRequest statusFilter="Completed" serviceId={serviceId} />,
		Canceled: <ManageRequest statusFilter="Canceled" serviceId={serviceId} />,
	};

	return (
		<div className="flex flex-col relative w-full justify-center gap-6">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row items-center text-sm gap-3">
					<div
						className="flex flex-row items-center gap-3 hover:text-secondary cursor-pointer"
						onClick={() => router.push(`/services/`)}
					>
						<RiArrowLeftLine />
						Back to Service Desk
					</div>
					<div className="text-black">/ {serviceInfo?.service_title}</div>
				</div>

				<div className="bg-white px-8 pt-4 rounded-2xl border border-gray-200 ">
					{serviceInfo && (
						<div className="flex flex-row justify-between items-center pb-4 text-md font-semibold">
							<div className="flex items-center gap-4">
								<div className="w-[120px] h-[80px] relative rounded-[10px] overflow-hidden">
									<Image
										src={
											serviceInfo.service_photo
												? getPublicUrl(
														serviceInfo.service_photo,
														"services-pictures"
													)
												: "/default-image.jpg"
										}
										alt={`${serviceInfo.service_title} image`}
										fill
										className="object-cover"
									/>
								</div>
								{serviceInfo.service_title}
							</div>

							<div className="flex items-center gap-4">
								<div className="flex items-center gap-1">
									<span>{serviceInfo.service_ratings}</span>
									<RiStarFill className="text-secondary" />
								</div>
								<div className="flex items-center gap-1">
									<span>{serviceInfo.service_avail}</span>
									<RiUser2Fill className="text-secondary" />
								</div>
								<div>
									<RiEditBoxLine
										onClick={() => router.push(`/services/${serviceId}/edit`)}
										size={22}
										className="hover:bg-white rounded-full cursor-pointer"
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

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

export default Request;
