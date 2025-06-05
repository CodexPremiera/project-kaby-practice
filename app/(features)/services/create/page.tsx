"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import { Service } from "@/lib/clients/ViewServiceClient";
import ServiceOverview from "@/components/services/view/ServiceDetails/ServiceOverview";
import ServicePayment from "@/components/services/view/ServiceDetails/ServicePayment";
import ServiceSettings from "@/components/services/view/ServiceDetails/ServiceSettings";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";
import ConfirmationModal from "@/components/modal/ConfirmationModal";

// --- Validation helpers for each tab ---

const isValidOverview = (service: Service | null) => {
	if (!service) return false;
	return (
		service.title.trim() !== "" &&
		service.type !== "Select" &&
		service.category !== "Select"
	);
};

const isValidPayment = (service: Service | null) => {
	if (!service) return false;
	return service.service_cost > 0 && service.payment_type.trim() !== "";
};

const isValidSettings = (service: Service | null) => {
	if (!service) return false;
	// Example: require status to be set (customize as needed)
	return service.status === "Active" || service.status === "Closed";
};

// Final full validation before create
const isValidService = (service: Service | null) => {
	return (
		isValidOverview(service) &&
		isValidPayment(service) &&
		isValidSettings(service)
	);
};

const CreatePage = () => {
	const router = useRouter();
	const pathname = usePathname();
	const serviceId = pathname.split("/")[2];

	const [activeTab, setActiveTab] = useState<
		"Overview" | "Payment" | "Settings"
	>("Overview");
	const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
	const isLargeScreen = useMediaQuery("(min-width: 1280px)");

	const [service, setService] = useState<Service | null>(null);

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [modalType, setModalType] = useState<"success" | "error" | null>(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, []);

	// Submit to backend API
	const handleSubmit = async () => {
		if (!service || !isValidService(service)) {
			setModalType("error");
			return;
		}

		setSaving(true);
		setModalType(null);

		const { owner_name, ...serviceToCreate } = service;
		try {
			const res = await fetch("/api/services", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(serviceToCreate),
			});

			if (res.ok) {
				setModalType("success");
				setTimeout(() => {
					router.push("/services");
				}, 1000);
			} else {
				setModalType("error");
			}
		} catch (err) {
			console.error("Error creating service", err);
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
		Overview: <ServiceOverview service={service} setService={setService} />,
		Payment: <ServicePayment service={service} setService={setService} />,
		Settings: <ServiceSettings service={service} setService={setService} />,
	};

	const handleTabChange = (tab: typeof activeTab) => {
		setActiveTab(tab);
		setShowMobileSwitcher(false);
	};

	// Proceed button for Overview & Payment tabs
	const renderProceedButton = () => {
		let disabled = false;
		let buttonText = "Proceed";

		if (activeTab === "Overview") {
			disabled = !isValidOverview(service) || saving;
		} else if (activeTab === "Payment") {
			disabled = !isValidPayment(service) || saving;
		}

		const handleProceed = () => {
			if (disabled) return;
			if (activeTab === "Overview") setActiveTab("Payment");
			else if (activeTab === "Payment") setActiveTab("Settings");
		};

		return (
			<div className="flex justify-end gap-4">
				<button
					onClick={handleProceed}
					disabled={disabled}
					className={`px-6 py-2 rounded text-white ${
						!disabled
							? "bg-black hover:bg-opacity-90 cursor-pointer"
							: "bg-gray-400 cursor-not-allowed"
					}`}
				>
					{buttonText}
				</button>
			</div>
		);
	};

	// Create button only on Settings tab
	const renderCreateButton = () => {
		if (activeTab !== "Settings") return null;

		const buttonText = "Create Service";

		return (
			<div className="flex justify-end gap-4">
				<button
					onClick={() => setShowConfirmModal(true)}
					disabled={!service || !isValidService(service) || saving}
					className={`px-6 py-2 rounded text-white ${
						service && isValidService(service) && !saving
							? "bg-black hover:bg-opacity-90 cursor-pointer"
							: "bg-gray-400 cursor-not-allowed"
					}`}
				>
					{saving ? "Saving..." : buttonText}
				</button>
			</div>
		);
	};

	if (loading) return <div>Loading...</div>;

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
					<div className="text-black">/ Create</div>
				</div>
			</div>

			<div className="main flex flex-col xl:flex-row items-start w-full max-w-[1440px] mx-auto gap-6 xl:gap-20">
				{isLargeScreen ? (
					<TabSwitcher
						tabComponents={TAB_COMPONENTS}
						tabLabels={TAB_LABELS}
						defaultTab="Overview"
						className="flex flex-col sticky top-0 gap-6 w-fit pt-4"
						activeTab={activeTab}
						setActiveTab={handleTabChange}
					/>
				) : (
					<>
						<div className="flex w-fit gap-4 items-center relative mx-6 px-2">
							<h1 className="text-2xl font-semibold">
								{TAB_LABELS[activeTab]}
							</h1>
							<button onClick={() => setShowMobileSwitcher((prev) => !prev)}>
								<ChevronDown className="w-6 h-6" />
							</button>
						</div>
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
					</>
				)}

				<div className="w-full px-4 flex flex-col gap-4">
					<div className="flex flex-col gap-6 w-full background-1 sm:rounded-3xl border border-light-color p-2 lg:p-4 xl:p-6 rounded-xl mb-4">
						{TAB_COMPONENTS[activeTab]}
					</div>

					{/* Proceed buttons for Overview & Payment */}
					{(activeTab === "Overview" || activeTab === "Payment") &&
						renderProceedButton()}

					{/* Create button on Settings tab */}
					{renderCreateButton()}
				</div>
			</div>

			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Service created successfully!"
					onClose={closeModal}
				/>
			)}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content="Please complete all required fields before saving."
					onClose={closeModal}
				/>
			)}
			{showConfirmModal && (
				<ConfirmationModal
					title="Confirm Create"
					content="Are you sure you want to create this service?"
					onConfirm={() => {
						setShowConfirmModal(false);
						handleSubmit();
					}}
					onClose={() => setShowConfirmModal(false)}
				/>
			)}
		</div>
	);
};

export default CreatePage;
