"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import CreateOverview from "@/components/services/create/ServiceDetails/CreateOverview";
import CreateRequirements from "@/components/services/create/ServiceDetails/CreateRequirements";
import CreatePayment from "@/components/services/create/ServiceDetails/CreatePayment";
import { CurrentUser, getCurrentUser } from "@/lib/clients/useAuthClient";

export type ServiceFormData = {
	title: string;
	type: string;
	category: string;
	description: string;
	image: string;
	display_badge: boolean;
	eligible_for_badges: boolean;
};

export type RequirementsFormData = {
	start_date: Date | null;
	end_date: Date | null;
	date_created: string | null;
	attach_requirements: "Yes" | "No";
	date_option: "Scheduled" | "Available Anytime";
};

export type PaymentFormData = {
	service_cost: number;
	payment_type: string;
	percentage: number;
	agreement_fee: number;
	convenience_fee: number;
	total_price: number;
};

export type FormData = ServiceFormData & RequirementsFormData & PaymentFormData;

const CreateServicePage = () => {
	const router = useRouter();
	const isLargeScreen = useMediaQuery("(min-width: 1280px)");
	const [user, setUser] = React.useState<CurrentUser>(null);

	const [activeTab, setActiveTab] = useState<
		"Overview" | "Requirements" | "Payment"
	>("Overview");
	const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [modalType, setModalType] = useState<"success" | "error" | null>(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		title: "",
		type: "Select Type",
		category: "Select Category",
		description: "",
		image: "",
		display_badge: false,
		eligible_for_badges: false,

		start_date: null,
		end_date: null,
		date_created: null,
		attach_requirements: "No",
		date_option: "Available Anytime",

		service_cost: 0,
		payment_type: "",
		percentage: 100,
		agreement_fee: 0,
		convenience_fee: 0,
		total_price: 0,
	});

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await getCurrentUser();
			setUser(currentUser);
			setLoading(false);
		};
		fetchUser();
	}, []);

	const updateFormData = <K extends keyof FormData>(
		field: K,
		value: FormData[K]
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async () => {
		setModalType(null);

		const fullPayload = {
			title: formData.title,
			image: formData.image,
			description: formData.description,
			service_cost: formData.service_cost,
			ratings: 0,
			no_of_avail: 0,
			date_created:
				formData.date_created || new Date().toISOString().slice(0, 10),
			date_closed: null,
			type: formData.type,
			start_date: formData.start_date
				? formData.start_date.toISOString().slice(0, 10)
				: null,
			end_date: formData.end_date
				? formData.end_date.toISOString().slice(0, 10)
				: null,
			allow_attach_file: formData.attach_requirements,
			display_badge: formData.display_badge,
			eligible_for_badges: formData.eligible_for_badges,
			agreement_fee: formData.agreement_fee,
			convenience_fee: formData.convenience_fee,
			total_price: formData.total_price,
			owner: user?.user_id,
			category: formData.category,
			payment_type: formData.payment_type,
			percentage: formData.percentage,
		};
		console.log("Payload being sent:", fullPayload);

		try {
			const response = await fetch("/api/services", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(fullPayload),
			});

			if (!response.ok) {
				setModalType("error");
				setSaving(false);
				return;
			}

			const result = await response.json();
			console.log("Response from API:", result);

			setSaving(true);
			setTimeout(() => {
				setModalType("success");
			}, 2000);
			router.push("/services");
		} catch (err) {
			setModalType("error");
		} finally {
			setSaving(false);
		}
	};

	const closeModal = () => setModalType(null);

	const TAB_LABELS = {
		Overview: "Overview",
		Requirements: "Requirements",
		Payment: "Payment",
	};

	const TAB_COMPONENTS = {
		Overview: (
			<CreateOverview
				formData={{
					title: formData.title,
					type: formData.type,
					category: formData.category,
					description: formData.description,
					image: formData.image,
					display_badge: formData.display_badge,
					eligible_for_badges: formData.eligible_for_badges,
				}}
				updateFormData={(field, value) =>
					updateFormData(field as keyof ServiceFormData, value)
				}
			/>
		),
		Requirements: (
			<CreateRequirements
				formData={{
					start_date: formData.start_date,
					end_date: formData.end_date,
					date_created: formData.date_created,
					attach_requirements: formData.attach_requirements,
					date_option: formData.date_option,
				}}
				updateFormData={(field, value) =>
					updateFormData(field as keyof RequirementsFormData, value)
				}
			/>
		),
		Payment: (
			<CreatePayment
				formData={{
					service_cost: formData.service_cost,
					payment_type: formData.payment_type,
					percentage: formData.percentage,
					agreement_fee: formData.agreement_fee,
					convenience_fee: formData.convenience_fee,
					total_price: formData.total_price,
				}}
				updateFormData={(field, value) =>
					updateFormData(field as keyof PaymentFormData, value)
				}
			/>
		),
	};

	const handleTabChange = (tab: typeof activeTab) => {
		setActiveTab(tab);
		setShowMobileSwitcher(false);
	};

	// Validation helpers
	const isOverviewValid = () => {
		return (
			formData.title.trim() !== "" &&
			formData.type !== "Select Type" &&
			formData.category !== "Select Category" &&
			formData.description.trim() !== "" &&
			formData.image.trim() !== ""
		);
	};

	const isRequirementsValid = () => {
		if (formData.attach_requirements === "Yes") {
			if (formData.date_option === "Scheduled") {
				return formData.start_date !== null && formData.end_date !== null;
			}
			return true;
		}
		return true;
	};

	const isPaymentValid = () => {
		return (
			formData.service_cost > 0 &&
			(formData.payment_type === "Fixed" ||
				formData.payment_type === "Quote") &&
			formData.percentage > 0 &&
			formData.agreement_fee >= 0 &&
			formData.convenience_fee >= 0 &&
			formData.total_price > 0
		);
	};

	// Convenience booleans
	const isOverviewComplete = isOverviewValid();
	const isRequirementsComplete = isRequirementsValid();
	const isPaymentComplete = isPaymentValid();

	const isCurrentTabValid = () => {
		if (activeTab === "Overview") return isOverviewComplete;
		if (activeTab === "Requirements") return isRequirementsComplete;
		if (activeTab === "Payment") return isPaymentComplete;
		return false;
	};

	const renderProceedButton = () => {
		const isLastTab = activeTab === "Payment";
		const buttonText = isLastTab ? "Create Service" : "Proceed";

		let disabled = false;
		let tooltip = "";

		if (activeTab === "Overview") {
			disabled = !isOverviewComplete || saving || !user;
		} else if (activeTab === "Requirements") {
			disabled =
				!isOverviewComplete || !isRequirementsComplete || saving || !user;
			if (!isOverviewComplete) {
				tooltip = "Service overview hasn't filled up yet";
			}
		} else if (activeTab === "Payment") {
			disabled = !isOverviewComplete || !isPaymentComplete || saving || !user;
			if (!isOverviewComplete) {
				tooltip = "Service overview hasn't filled up yet";
			} else if (!isPaymentComplete) {
				tooltip = "Payment details are incomplete";
			}
		}

		const onClickHandler = () => {
			if (disabled) return;

			if (isLastTab) {
				setShowConfirmModal(true);
			} else {
				if (activeTab === "Overview") setActiveTab("Requirements");
				else if (activeTab === "Requirements") setActiveTab("Payment");
			}
		};

		return (
			<div className="flex justify-end gap-4">
				<button
					onClick={onClickHandler}
					disabled={disabled}
					className={`px-6 py-2 rounded text-white ${
						!disabled
							? "bg-black hover:bg-opacity-90 cursor-pointer"
							: "bg-gray-400 cursor-not-allowed"
					}`}
					title={tooltip}
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
					<p className="text-gray-500">Loading Create Service Page...</p>
				</div>
			) : (
				<>
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
							{renderProceedButton()}
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
							content="An unexpected error occurred while saving!"
							onClose={closeModal}
						/>
					)}
					{showConfirmModal && (
						<ConfirmationModal
							title="Confirm Create Service"
							content="Are you sure you want to create this service?"
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

export default CreateServicePage;
