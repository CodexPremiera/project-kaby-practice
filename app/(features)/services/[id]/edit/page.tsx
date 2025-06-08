"use client";

import React, { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import { getServiceById, Service } from "@/lib/clients/ViewServiceClient";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import EditOverview from "@/components/services/edit/ServiceDetails/EditOverview";
import EditPayment from "@/components/services/edit/ServiceDetails/EditPayment";
import EditSettings from "@/components/services/edit/ServiceDetails/EditSettings";

const EditServicePage = () => {
	const router = useRouter();
	const pathname = usePathname();
	const serviceId = pathname.split("/")[2];

	const [activeTab, setActiveTab] = useState<
		"Overview" | "Payment" | "Settings"
	>("Overview");
	const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
	const isLargeScreen = useMediaQuery("(min-width: 1280px)");

	const [service, setService] = useState<Service | null>(null);
	const [originalService, setOriginalService] = useState<Service | null>(null);
	const [loading, setLoading] = useState(true);

	const [saving, setSaving] = useState(false);
	const [modalType, setModalType] = useState<"success" | "error" | null>(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	useEffect(() => {
		async function fetchService() {
			if (!serviceId) return;
			setLoading(true);
			const data = await getServiceById(serviceId);
			if (data) {
				setService(data);
				setOriginalService(data);
			}
			setLoading(false);
		}
		fetchService();
	}, [serviceId]);

	const hasChanges = useMemo(() => {
		if (!service || !originalService) return false;
		return JSON.stringify(service) !== JSON.stringify(originalService);
	}, [service, originalService]);

	const handleSubmit = async () => {
		if (!service) return;

		setSaving(true);
		setModalType(null);

		const { owner_name, ...serviceToUpdate } = service;

		try {
			const response = await fetch(`/api/services/${service.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(serviceToUpdate),
			});

			if (!response.ok) {
				setModalType("error");
				setSaving(false);
				return;
			}

			const updatedService = await response.json();

			setOriginalService(updatedService);
			setService(updatedService);
			setModalType("success");
			window.location.reload();
		} catch (err) {
			setModalType("error");
		} finally {
			setSaving(false);
		}
	};

	const closeModal = () => setModalType(null);

	const TAB_LABELS = {
		Overview: "Overview",
		Payment: "Payment",
		Settings: "Settings",
	};

	const TAB_COMPONENTS = {
		Overview: <EditOverview service={service} setService={setService} />,
		Payment: <EditPayment service={service} setService={setService} />,
		Settings: <EditSettings service={service} setService={setService} />,
	};

	const handleTabChange = (tab: typeof activeTab) => {
		setActiveTab(tab);
		setShowMobileSwitcher(false);
	};

	const renderSaveButton = () => {
		if (!["Overview", "Payment", "Settings"].includes(activeTab)) return null;

		const buttonText =
			activeTab === "Overview"
				? "Save Overview"
				: activeTab === "Payment"
					? "Save Payment"
					: "Save Settings";

		return (
			<div className="flex justify-end gap-4">
				<button
					onClick={() => setShowConfirmModal(true)}
					disabled={!hasChanges || saving}
					className={`px-6 py-2 rounded text-white ${
						hasChanges && !saving
							? "bg-black hover:bg-opacity-90 cursor-pointer"
							: "bg-gray-400 cursor-not-allowed"
					}`}
				>
					{saving ? "Saving..." : buttonText}
				</button>
			</div>
		);
	};

	return (
		<div className="flex flex-col relative w-full justify-center gap-6">
			{loading ? (
				<div className="flex flex-col gap-4 p-8 items-center justify-center">
					<p className="text-gray-500">Getting service details...</p>
				</div>
			) : (
				<>
					{/* Breadcrumb */}
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
								onClick={() => router.push(`/services/${service?.id}/request`)}
							>
								/ {service?.title}
							</div>
							<div className="text-black">/ Edit</div>
						</div>
					</div>

					{/* Main Layout */}
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

						<div className="w-full px-4 flex flex-col gap-4">
							<div className="flex flex-col gap-6 w-full background-1 sm:rounded-3xl border border-light-color p-2 lg:p-4 xl:p-6 rounded-xl mb-4">
								{TAB_COMPONENTS[activeTab]}
							</div>
							{renderSaveButton()}
						</div>
					</div>

					{/* Modals */}
					{modalType === "success" && (
						<SuccessModal
							title="Success"
							content="Service updated successfully!"
							onClose={closeModal}
						/>
					)}

					{modalType === "error" && (
						<ErrorModal
							title="Error"
							content="An unexpected error occurred while saving!"
							onClose={closeModal}
						/>
					)}

					{showConfirmModal && (
						<ConfirmationModal
							title="Confirm Save"
							content="Are you sure you want to save these changes?"
							onConfirm={() => {
								setShowConfirmModal(false);
								handleSubmit();
							}}
							onClose={() => setShowConfirmModal(false)}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default EditServicePage;
