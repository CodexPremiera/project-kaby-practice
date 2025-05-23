"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ServiceForm {
	serviceTitle: string;
	serviceType: string;
	dateOption: string;
	description: string;
	attachRequirements: string;
	displayBadge: string;
	eligibleForBadges: string;
	selectedImage: string | null;
	selectedImageFile: File | null;
	startDate: Date | null;
	endDate: Date | null;
	serviceCost?: number;
	paymentType: string;
	agreementFeePercent: number;
}

type ModalType = "loading" | "success" | "error" | null;

const serviceTypes = ["Barangay", "Personal", "Event"];
const yesNoOptions = ["Yes", "No"];
const dateOptions = ["Available Date", "Not Applicable"];
const paymentTypes = ["Fixed Rate", "Quote"];

export function useServiceComposer(userRole: string | null) {
	const today = new Date().toISOString().split("T")[0];
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [form, setForm] = useState<ServiceForm>({
		serviceTitle: "",
		serviceType: "Select Type",
		dateOption: "Available Date",
		description: "",
		attachRequirements: "No",
		displayBadge: "No",
		eligibleForBadges: "No",
		selectedImage: null,
		selectedImageFile: null,
		startDate: null,
		endDate: null,
		serviceCost: undefined,
		paymentType: "Fixed Rate",
		agreementFeePercent: 100,
	});

	const [modalType, setModalType] = useState<ModalType>(null);
	const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
		{}
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Auto set serviceType based on userRole
	useEffect(() => {
		if (userRole === "barangay") {
			setForm((prev) => ({ ...prev, serviceType: "Barangay" }));
		} else if (userRole === "citizen") {
			setForm((prev) => ({ ...prev, serviceType: "Personal" }));
		}
	}, [userRole]);

	// Reset agreementFeePercent if Fixed Rate
	useEffect(() => {
		if (form.paymentType === "Fixed Rate") {
			setForm((prev) => ({ ...prev, agreementFeePercent: 100 }));
		}
	}, [form.paymentType]);

	// Calculate fees
	const agreementFeeValue =
		form.serviceCost !== undefined
			? form.paymentType === "Fixed Rate"
				? form.serviceCost
				: Math.max(
						form.serviceCost * (form.agreementFeePercent / 100),
						form.serviceCost * 0.05
					)
			: 0;

	const convenienceFee = agreementFeeValue * 0.03;
	const totalPrice = agreementFeeValue + convenienceFee;

	// Handle image file change (set preview and file)
	const handleImageChange = (file: File | null) => {
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setForm((prev) => ({
					...prev,
					selectedImage: reader.result as string,
					selectedImageFile: file,
				}));
			};
			reader.readAsDataURL(file);
		} else {
			// Clear image if null
			setForm((prev) => ({
				...prev,
				selectedImage: null,
				selectedImageFile: null,
			}));
		}
	};

	// Validation
	const validateForm = (): boolean => {
		const errors: { [key: string]: string } = {};

		if (!form.selectedImageFile) errors.image = "Image is required";
		if (!form.serviceTitle.trim())
			errors.serviceTitle = "Service Title is required";

		if (form.serviceType === "Select Type")
			errors.serviceType = "Service Type is required";

		if (!form.description.trim())
			errors.description = "Description is required";

		if (!yesNoOptions.includes(form.attachRequirements))
			errors.attachRequirements = "Attach requirements is required";

		if (!yesNoOptions.includes(form.eligibleForBadges))
			errors.eligibleForBadges = "Eligible for badges is required";

		if (form.serviceCost === undefined || form.serviceCost < 0)
			errors.serviceCost = "Valid service cost is required";

		if (!paymentTypes.includes(form.paymentType))
			errors.paymentType = "Payment type is required";

		if (form.dateOption === "Available Date") {
			if (!form.startDate || !form.endDate)
				errors.date = "Please select both start and end dates.";
			else if (form.startDate > form.endDate)
				errors.date = "Start date cannot be after end date.";
		}
		setErrorMessages(errors);
		return Object.keys(errors).length === 0;
	};

	// Handle form submit
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);
		setModalType("loading");

		try {
			let uploadedImagePath: string | null = null;

			// Upload image file to Supabase storage bucket
			if (form.selectedImageFile) {
				const uniqueName = `${Date.now()}-${form.selectedImageFile.name.replace(/\s+/g, "-").toLowerCase()}`;

				const { data, error } = await supabase.storage
					.from("services-pictures")
					.upload(`uploads/${uniqueName}`, form.selectedImageFile, {
						cacheControl: "3600",
						upsert: false,
					});

				if (error) {
					console.error("Upload Error:", error.message);
					setModalType("error");
					setIsSubmitting(false);
					return;
				}

				uploadedImagePath = data?.path ?? null;
			}

			const finalStartDate =
				form.dateOption === "Available Date" ? form.startDate : today;
			const finalEndDate =
				form.dateOption === "Available Date" ? form.endDate : null;

			const serviceData = {
				title: form.serviceTitle,
				type: form.serviceType,
				description: form.description,
				allow_attach_file: form.attachRequirements,
				start_date: finalStartDate,
				end_date: finalEndDate,
				image: uploadedImagePath,
				owner: null,
				service_cost: form.serviceCost ?? 0,
				agreement_fee: agreementFeeValue,
				convenience_fee: convenienceFee,
				total_price: totalPrice,
				eligible_for_badges: form.eligibleForBadges,
				display_badge: form.displayBadge,
			};

			const res = await fetch("/api/services", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(serviceData),
			});

			if (res.ok) {
				setModalType("success");
				// Reset form state
				setForm({
					serviceTitle: "",
					serviceType: "Select Type",
					dateOption: "Available Date",
					description: "",
					attachRequirements: "No",
					displayBadge: "No",
					eligibleForBadges: "No",
					selectedImage: null,
					selectedImageFile: null,
					startDate: null,
					endDate: null,
					serviceCost: undefined,
					paymentType: "Fixed Rate",
					agreementFeePercent: 100,
				});
				if (fileInputRef.current) fileInputRef.current.value = "";
			} else {
				console.error("Failed to create service:", await res.json());
				setModalType("error");
			}
		} catch (error) {
			console.error("Submit error:", error);
			setModalType("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		form,
		setForm,
		modalType,
		setModalType,
		errorMessages,
		isSubmitting,
		agreementFeeValue,
		convenienceFee,
		totalPrice,
		handleImageChange,
		handleSubmit,
		fileInputRef,
		serviceTypes,
		yesNoOptions,
		dateOptions,
		paymentTypes,
	};
}
