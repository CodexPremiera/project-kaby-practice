"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { ChevronDown } from "lucide-react";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import ManageRequest from "@/components/services/request/ManageRequest";
import {
	RiArrowLeftLine,
	RiEdit2Line,
	RiStarFill,
	RiUser2Fill,
} from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { getServiceById } from "@/lib/clients/ViewServiceClient";
import { getPublicUrl } from "@/utils/supabase/storage";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

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
		title: string;
		ratings: number;
		avail: number;
		photo?: string;
		type: string;
		status: string;
		category?: string;
		start_date?: Date;
		end_date?: Date;
	} | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchServiceInfo = async () => {
			if (!serviceId) return;
			setLoading(true);
			const data = await getServiceById(serviceId);
			if (data) {
				setServiceInfo({
					title: data.title,
					ratings: data.ratings,
					avail: data.no_of_avail,
					photo: data.image ?? undefined,
					type: data.type,
					status: data.status,
					category: data.category ?? undefined,
					start_date: data.start_date ?? undefined,
					end_date: data.end_date ?? undefined,
				});
			}
			setLoading(false);
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
			{loading ? (
				<div className="flex flex-col gap-4 p-8 items-center justify-center">
					<p className="text-gray-500 ">Getting service requests...</p>
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
							<div className="text-black">/ {serviceInfo?.title}</div>
						</div>

						<div className="bg-white px-8 pt-4 rounded-2xl border border-gray-200">
							{serviceInfo && (
								<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4">
									{/* Image + Title */}
									<div className="flex items-center gap-4 w-full md:w-auto">
										<div className="w-[120px] h-[80px] relative rounded-[10px] overflow-hidden flex-shrink-0">
											<Image
												src={
													serviceInfo.photo
														? getPublicUrl(
																serviceInfo.photo,
																"services-pictures"
															)
														: "/default-image.jpg"
												}
												alt={`${serviceInfo.title} image`}
												fill
												className="object-cover"
											/>
										</div>

										<div className="flex flex-col">
											<div className="flex flex-row items-center justify-center gap-1">
												<div className="text-base font-semibold">
													{serviceInfo.title}
												</div>

												<div>
													<RiEdit2Line
														onClick={() =>
															router.push(`/services/${serviceId}/edit`)
														}
														size={26}
														className="hover:bg-gray-100 p-1 rounded-full cursor-pointer"
													/>
												</div>
											</div>
											<div className="text-sm text-gray-500">
												{serviceInfo.type} • {serviceInfo.category}
											</div>
										</div>
									</div>

									{/* Stats + Status */}
									<div className="flex flex-wrap items-center justify-between w-full md:w-auto md:gap-6">
										<div className="text-sm text-gray-500 italic">
											{serviceInfo.end_date === null ? (
												"Available anytime"
											) : (
												<>
													{formatDate(serviceInfo.start_date)} •{" "}
													{formatDate(serviceInfo.end_date)}
												</>
											)}
										</div>
										<div className="flex flex-row gap-5">
											<div className="flex items-center gap-1 text-sm">
												<RiStarFill className="text-secondary" />
												<span>{serviceInfo.ratings}</span>
											</div>

											<div className="flex items-center gap-1 text-sm">
												<RiUser2Fill className="text-secondary" />
												<span>{serviceInfo.avail}</span>
											</div>

											<div
												className={`h-9 flex items-center px-4 rounded text-white text-sm font-semibold ${
													serviceInfo.status === "Active"
														? "bg-green-400"
														: "bg-gray-400"
												}`}
											>
												{serviceInfo.status}
											</div>
										</div>
									</div>
								</div>
							)}
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
				</>
			)}
		</div>
	);
};

export default Request;
