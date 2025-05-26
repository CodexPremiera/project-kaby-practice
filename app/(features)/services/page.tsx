"use client";

import React, { useEffect, useState } from "react";
import ActiveService from "@/components/services/your_services/ActiveService";
import ClosedService from "@/components/services/your_services/ClosedService";
import { Button } from "@/components/ui/button";
import { RiSearch2Line } from "react-icons/ri";
import CreateServiceClient from "./CreateServiceClient";
import ButtonTab from "@/components/ui/tabs/ButtonTab";
import ServiceSearchBar from "@/components/services/ServiceSearchBar";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";

// Props type for components that need userId and userRole
type ServiceComponentProps = {
	userId: string;
	userRole: string;
};

// Tab components mapping
const TAB_COMPONENTS = {
	active: ({ userId, userRole }: ServiceComponentProps) => (
		<ActiveService userId={userId} userRole={userRole} />
	),
	closed: ({ userId, userRole }: ServiceComponentProps) => (
		<ClosedService userId={userId} userRole={userRole} />
	),
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	active: "Active",
	closed: "Closed",
};

const ServiceDesk = () => {
	const [userId, setUserId] = useState<string | null>(null);
	const [userRole, setUserRole] = useState<string | null>(null);
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("active");
	const [showCreateService, setShowCreateService] = useState(false);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const res = await fetch("/api/auth/login");
				const data = await res.json();
				setUserId(data.user_id);
				setUserRole(data.role);
			} catch (err) {
				console.error("Error fetching user details:", err);
			}
		};

		fetchUserDetails();
	}, []);

	return (
		<div className="flex flex-col w-full max-w-[1280px] mx-auto gap-8 swiper-coverflow">
			<div
				className="flex flex-col w-full min-h-[600px] background-1 rounded-2xl sm:rounded-3xl border border-light-color p-6 md:p-8 gap-6">
				<div className="flex flex-col-reverse gap-6 lg:flex-row lg:justify-between lg:items-center ">
					{/* Tabs */}
					<div className="relative flex flex-col w-full min-h-screen">
						{/* Heading */}
						<div className="flex flex-col mb-4 gap-2">
							<div className="text-lg font-semibold">Service Desk</div>
							<div className="text-sm">
								Manage your services and provide the best experience to your
								clients.
							</div>
						</div>

						{/* Tabs + Actions */}
						<div className="flex flex-col-reverse gap-4 py-2 sm:flex-row sm:justify-between sm:items-center">
							{/* Tabs */}
							<nav className="flex flex-wrap gap-2">
								{Object.keys(TAB_COMPONENTS).map((tab) => (
									<ButtonTab
										key={tab}
										onClick={() =>
											setActiveTab(tab as keyof typeof TAB_COMPONENTS)
										}
										active={activeTab === tab}
										className="text-sm"
									>
										{TAB_LABELS[tab as keyof typeof TAB_LABELS]}
									</ButtonTab>
								))}
							</nav>

							{/* Actions */}
							<div className="flex flex-row gap-2 items-center sm:justify-end">
								<ServiceSearchBar />
								<ButtonPrimary onClick={() => setShowCreateService(true)}>
									+ Add New
								</ButtonPrimary>
							</div>
						</div>

						{/* Content */}
						<div className="flex-1 overflow-y-auto bg-white">
							{userId && userRole ? (
								TAB_COMPONENTS[activeTab]({userId, userRole})
							) : (
								<div className="text-center py-10 text-gray-500">
									Loading services...
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Create Service Modal */}
				{showCreateService && (
					<CreateServiceClient
						onClose={() => setShowCreateService(false)}
						userRole={userRole}
					/>
				)}
			</div>
		</div>

	);
};

export default ServiceDesk;
