"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiCloseLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import DatePicker from "@/components/services/DatePicker";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";
import ErrorPopup from "@/components/modal/ErrorPopup";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CreateServiceProps {
	onClose: () => void;
	userRole: string | null;
}

const serviceTypes = ["Barangay", "Personal", "Event"];
const yesNoOptions = ["Yes", "No"];
const dateOptions = ["Available Date", "Not Applicable"];
const paymentTypes = ["Fixed Rate", "Quote"];

const CreateServiceClient: React.FC<CreateServiceProps> = ({
	onClose,
	userRole,
}) => {
	const [form, setForm] = useState({
		serviceTitle: "",
		serviceType: "Select Type",
		dateOption: "Available Date",
		description: "",
		attachRequirements: "No",
		displayBadge: "No",
		eligibleForBadges: "No",
		selectedImage: null as string | null,
		startDate: null as Date | null,
		endDate: null as Date | null,
		serviceCost: undefined as number | undefined,
		paymentType: "Fixed Rate",
		agreementFeePercent: 100,
	});
	const [modalType, setModalType] = useState<"success" | "error" | null>(null);
	const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
		{}
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const today = new Date().toISOString().split("T")[0];

	const agreementFeeValue =
		form.serviceCost !== undefined && form.serviceCost >= 0
			? form.paymentType === "Fixed Rate"
				? form.serviceCost
				: Math.max(
						form.serviceCost * (form.agreementFeePercent / 100),
						form.serviceCost * 0.05
					)
			: 0;

	const convenienceFee = agreementFeeValue * 0.03;
	const totalPrice = agreementFeeValue + convenienceFee;

	useEffect(() => {
		if (form.paymentType === "Fixed Rate") {
			setForm((prev) => ({ ...prev, agreementFeePercent: 100 }));
		}
	}, [form.paymentType]);

	useEffect(() => {
		if (userRole === "barangay") {
			setForm((prev) => ({ ...prev, serviceType: "Barangay" }));
		} else if (userRole === "citizen") {
			setForm((prev) => ({ ...prev, serviceType: "Personal" }));
		}
	}, [userRole]);

	const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

	const handleCreateService = async () => {
		setIsSubmitting(true);
		setErrorMessages({});
		const errors: { [key: string]: string } = {};

		if (!form.serviceTitle.trim())
			errors.serviceTitle = "Service title is required";
		if (!form.selectedImage) errors.image = "Image is required";
		if (form.serviceType === "Select Type")
			errors.serviceType = "Service Type is required";
		if (!form.description.trim())
			errors.description = "Description is required";
		if (form.serviceCost === undefined || isNaN(form.serviceCost))
			errors.serviceCost = "Service cost is required";
		if (!form.paymentType) errors.paymentType = "Payment type is required";

		if (form.dateOption === "Available Date") {
			if (!form.startDate || !form.endDate) {
				errors.date = "Please select both start and end dates.";
			}
		}

		if (Object.keys(errors).length > 0) {
			setErrorMessages(errors);
			setIsSubmitting(false);
			return;
		}

		let uploadedImagePath = "";
		if (selectedImageFile) {
			const uniqueName = `${Date.now()}-${selectedImageFile.name
				.replace(/\s+/g, "-")
				.toLowerCase()}`;

			const { data: uploadData, error: uploadError } = await supabase.storage
				.from("services-pictures")
				.upload(`uploads/${uniqueName}`, selectedImageFile, {
					cacheControl: "3600",
					upsert: false,
				});

			if (uploadError) {
				console.error("Image upload error:", uploadError.message);
				setModalType("error");
				setIsSubmitting(false);
				return;
			}

			uploadedImagePath = uploadData.path;
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

		try {
			const res = await fetch("/api/services", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(serviceData),
			});
			if (res.ok) {
				setModalType("success");
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				setModalType("error");
			}
		} catch (err) {
			setModalType("error");
			console.error("Error creating service", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-6">
			{/* Error Popup Alert */}
			<ErrorPopup
				errorMessages={errorMessages}
				onClose={() => setErrorMessages({})}
			/>
			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Service has been created successfully!"
					onClose={() => setModalType(null)}
				/>
			)}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content="Failed to create the service. Try again."
					onClose={() => setModalType(null)}
				/>
			)}
			<div className="relative bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
				<div className="flex flex-col gap-6">
					<div className="flex justify-between items-center py-3 pt-5 bg-gray-100">
						<div className="text-medium font-semibold text-black px-6">
							Create Service
						</div>
						<div className="absolute top-4 right-4 cursor-pointer">
							<RiCloseLine
								className="w-6 h-6 text-black hover:text-white"
								onClick={onClose}
							/>
						</div>
					</div>

					<div className="flex flex-row px-7 items-center">
						<label className="text-sm w-32">Service Title:</label>
						<Input
							placeholder="Enter title"
							value={form.serviceTitle}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, serviceTitle: e.target.value }))
							}
						/>
					</div>
					<div className="flex flex-col md:flex-row gap-6 px-6">
						<div className="flex flex-col gap-4">
							<div className="w-full md:w-[360px] h-[360px] flex flex-col justify-center items-center bg-black/80 rounded-lg overflow-hidden text-white relative">
								{form.selectedImage ? (
									<img
										src={form.selectedImage}
										alt="Selected"
										className="object-cover w-full h-full"
									/>
								) : (
									<label
										htmlFor="service-image-upload"
										className="flex flex-col items-center justify-center cursor-pointer text-center"
									>
										<p className="text-sm text-white">Click to upload image</p>
										<p className="text-xs text-gray mt-1">PNG, JPG, or JPEG</p>
									</label>
								)}

								<input
									type="file"
									id="service-image-upload"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files ? e.target.files[0] : null;
										setSelectedImageFile(file);
										if (file) {
											setForm((prev) => ({
												...prev,
												selectedImage: URL.createObjectURL(file),
											}));
										}
									}}
									className="hidden"
								/>
							</div>
						</div>

						<div className="flex flex-col w-full gap-4">
							<div className="flex flex-col md:flex-row gap-6">
								<div className="flex-1">
									<p className="text-sm">Service Type:</p>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="gray" className="w-full justify-between">
												{form.serviceType}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-white">
											{serviceTypes
												.filter(
													(type) =>
														userRole === "barangay"
															? type === "Barangay"
															: userRole === "citizen"
																? type === "Personal" || type === "Event"
																: true // fallback in case role not loaded yet
												)
												.map((type) => (
													<DropdownMenuItem
														key={type}
														onClick={() =>
															setForm((prev) => ({
																...prev,
																serviceType: type,
															}))
														}
													>
														{type}
													</DropdownMenuItem>
												))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								<div className="flex-1">
									<p className="text-sm">Schedule Option:</p>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="gray" className="w-full justify-between">
												{form.dateOption}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-white">
											{dateOptions.map((opt) => (
												<DropdownMenuItem
													key={opt}
													onClick={() =>
														setForm((prev) => ({
															...prev,
															dateOption: opt,
														}))
													}
												>
													{opt}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								{form.dateOption === "Available Date" && (
									<div className="flex-1 flex flex-col gap-4">
										<DatePicker
											selectedStartDate={form.startDate}
											selectedEndDate={form.endDate}
											onStartDateChange={(date) =>
												setForm((prev) => ({ ...prev, startDate: date }))
											}
											onEndDateChange={(date) =>
												setForm((prev) => ({ ...prev, endDate: date }))
											}
										/>
									</div>
								)}
							</div>
							<div className="flex flex-col flex-1">
								<label className="text-sm">Description:</label>
								<textarea
									placeholder="Enter service description"
									value={form.description}
									onChange={(e) =>
										setForm((prev) => ({
											...prev,
											description: e.target.value,
										}))
									}
									className="border border-gray-300 rounded-md px-3 py-2 text-sm h-41 resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/30 focus-visible:border-ring w-full overflow-y-auto"
								/>
							</div>

							<div className="flex flex-1 sm:flex-row flex-col sm:items-center items-start gap-6">
								<div className="flex items-center gap-2">
									<p className="text-sm">Attach requirements?</p>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="gray" className="w-24 justify-between">
												{form.attachRequirements}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-white">
											{yesNoOptions.map((opt) => (
												<DropdownMenuItem
													key={opt}
													onClick={() =>
														setForm((prev) => ({
															...prev,
															attachRequirements: opt,
														}))
													}
												>
													{opt}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								{userRole === "barangay" ? (
									<div className="flex items-center gap-2">
										<p className="text-sm">Eligible for badges?</p>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="gray" className="w-24 justify-between">
													{form.eligibleForBadges}
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="bg-white">
												{yesNoOptions.map((opt) => (
													<DropdownMenuItem
														key={opt}
														onClick={() =>
															setForm((prev) => ({
																...prev,
																eligibleForBadges: opt,
															}))
														}
													>
														{opt}
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								) : userRole === "citizen" ? (
									<div className="flex items-center gap-2">
										<p className="text-sm">Display Badge</p>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="gray"
													className="w-24 justify-between"
													disabled={userRole === "citizen"} // disables button for citizens
												>
													{form.displayBadge}
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="bg-white">
												{yesNoOptions.map((opt) => (
													<DropdownMenuItem
														key={opt}
														onClick={() =>
															setForm((prev) => ({
																...prev,
																displayBadge: opt,
															}))
														}
													>
														{opt}
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
										<p className="text-sm text-gray-600 italic">
											You currently have 0 Badges
										</p>
									</div>
								) : null}
							</div>
						</div>
					</div>

					<div className="space-y-4 pb-4">
						<div>
							<div className="flex justify-between items-center py-3 pt-5 bg-gray-100">
								<div className="text-medium font-semibold text-black px-6">
									Payment Arrangement
								</div>
							</div>

							<p className="text-sm px-6 sm:py-4 py-4">
								Select whether you charge a fixed rate or provide a quote upon a
								request.
							</p>
						</div>

						<div className="flex flex-col sm:px-10 px-6 gap-4">
							<div className="flex justify-between sm:gap-6 gap-4 pb-2">
								<div className="flex-1">
									<p className="text-sm">Service Cost (₱):</p>
									<Input
										type="number"
										placeholder="e.g. 3500"
										value={form.serviceCost ?? ""}
										onChange={(e) =>
											setForm((prev) => ({
												...prev,
												serviceCost: Number(e.target.value),
											}))
										}
									/>
								</div>
							</div>
							<div className="flex justify-between sm:gap-6 gap-4 pb-2">
								<div className="flex-1">
									<p className="text-sm">Payment Type:</p>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="gray" className="w-full justify-between">
												{form.paymentType}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-white">
											{paymentTypes.map((type) => (
												<DropdownMenuItem
													key={type}
													onClick={() =>
														setForm((prev) => ({
															...prev,
															paymentType: type,
														}))
													}
												>
													{type}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								<div className="flex-1">
									<p className="text-sm">Percentage (%)</p>
									<Input
										type="number"
										disabled={form.paymentType === "Fixed Rate"}
										value={form.agreementFeePercent}
										min={5}
										onChange={(e) =>
											setForm((prev) => ({
												...prev,
												agreementFeePercent: Math.max(
													5,
													Number(e.target.value)
												),
											}))
										}
									/>
								</div>
							</div>

							<div className="flex justify-between sm:gap-6 gap-4 py-2 pb-4">
								<div className="flex-1">
									<p className="text-sm">Agreement Fee Value (₱)</p>
									<Input
										type="text"
										value={agreementFeeValue.toFixed(2)}
										disabled
									/>
								</div>
							</div>

							<div className="sm:py-2 py-4">
								<div className="flex justify-between text-sm py-2">
									<p className="text-gray-600">Convenience Fee (+3%)</p>
									<p className="font-semibold">₱{convenienceFee.toFixed(2)}</p>
								</div>

								<div className="flex justify-between font-semibold text-secondary">
									<p>Total Price:</p>
									<p>₱{totalPrice.toFixed(2)}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row justify-end pb-6 px-6">
						<Button onClick={handleCreateService} className="w-full sm:w-auto">
							Create
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateServiceClient;
