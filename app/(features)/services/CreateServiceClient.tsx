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

interface CreateServiceProps {
	onClose: () => void;
}

const serviceTypes = ["Barangay", "Personal", "Event"];
const yesNoOptions = ["Yes", "No"];
const dateOptions = ["Available Date", "Not Applicable"];
const paymentTypes = ["Fixed Rate", "Quote"];

const CreateServiceClient: React.FC<CreateServiceProps> = ({ onClose }) => {
	const [serviceTitle, setServiceTitle] = useState("");
	const [serviceType, setServiceType] = useState("Barangay");
	const [dateOption, setDateOption] = useState("Available Date");
	const [description, setDescription] = useState("");
	const [attachRequirements, setAttachRequirements] = useState("No");
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};
	const today = new Date().toISOString().split("T")[0];

	// Payment Arrangement State
	const [serviceCost, setServiceCost] = useState<number | undefined>(undefined);
	const [paymentType, setPaymentType] = useState("Fixed Rate");
	const [agreementFeePercent, setAgreementFeePercent] = useState<number>(100);

	// Calculated Values
	const agreementFeeValue =
		serviceCost !== undefined
			? paymentType === "Fixed Rate"
				? serviceCost
				: Math.max(
						serviceCost * (agreementFeePercent / 100),
						serviceCost * 0.05
					)
			: 0;

	const convenienceFee = agreementFeeValue * 0.03;
	const totalPrice = agreementFeeValue + convenienceFee;

	// Effect to reset Agreement Fee % when payment type is "Fixed Rate"
	useEffect(() => {
		if (paymentType === "Fixed Rate") {
			setAgreementFeePercent(100);
		}
	}, [paymentType]);

	const handleCreateService = async () => {
		const serviceData = {
			title: serviceTitle,
			type: serviceType,
			description: description,
			allow_attach_file: attachRequirements,
			start_date: dateOption === "Available Date" ? today : null,
			end_date: dateOption === "Available Date" ? today : null,
			image: selectedImage,
			owner: null, // replace with logged-in user ID if needed
			service_cost: serviceCost ?? 0,
			agreement_fee: agreementFeeValue,
			convenience_fee: convenienceFee,
			total_price: totalPrice,
		};

		const res = await fetch("/api/services", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(serviceData),
		});

		const user_role = await fetch("/api/login", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(serviceData),
		});

		const data = await res.json();
		console.log("created service", data);
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-6">
			<div className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex flex-col gap-6">
					{/* Header */}
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

					{/* Service Details */}
					<div className="flex flex-col md:flex-row gap-6 py-2 px-6">
						<div className="w-full md:w-[360px] h-[255px] flex flex-col justify-center items-center bg-black/80 rounded-lg overflow-hidden text-white relative">
							{selectedImage ? (
								<img
									src={selectedImage}
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
								onChange={handleImageChange}
								className="hidden"
							/>
						</div>

						<div className="flex flex-col w-full gap-4">
							<div className="flex flex-col flex-1">
								<p className="text-sm">Service Title:</p>
								<Input
									placeholder="Enter title"
									value={serviceTitle}
									onChange={(e) => setServiceTitle(e.target.value)}
								/>
							</div>

							{/* Service Type */}
							<div className="flex flex-col md:flex-row gap-6">
								<div className="flex-1">
									<p className="text-sm">Service Type:</p>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="gray" className="w-full justify-between">
												{serviceType}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-white">
											{serviceTypes.map((type) => (
												<DropdownMenuItem
													key={type}
													onClick={() => setServiceType(type)}
												>
													{type}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								{/* Date option */}
								<div className="flex-1">
									<p className="text-sm">Schedule Option:</p>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="gray" className="w-full justify-between">
												{dateOption}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-white">
											{dateOptions.map((opt) => (
												<DropdownMenuItem
													key={opt}
													onClick={() => setDateOption(opt)}
												>
													{opt}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								{dateOption === "Available Date" && (
									<div className="flex-1 flex flex-col gap-4">
										<DatePicker />
									</div>
								)}
							</div>

							{/* Description */}
							<div className="flex flex-col flex-1">
								<p className="text-sm">Description:</p>
								<textarea
									placeholder="Enter service description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="border border-gray-300 rounded-md px-3 py-2 text-sm h-41 resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/30 focus-visible:border-ring w-full overflow-y-auto"
								/>
							</div>

							{/* Attach requirements */}
							<div className="flex flex-1 items-center gap-2">
								<p className="text-sm">Attach requirements?</p>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="gray" className="w-24 justify-between">
											{attachRequirements}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="bg-white">
										{yesNoOptions.map((opt) => (
											<DropdownMenuItem
												key={opt}
												onClick={() => setAttachRequirements(opt)}
											>
												{opt}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>

					{/* Payment Arrangement */}
					<div className="space-y-4 pb-4">
						<div>
							<div className="border-t border-gray-300 py-2">
								<p className="font-semibold text-sm px-6">
									Payment Arrangement
								</p>
							</div>

							<p className="text-sm px-6 sm:py-2 py-5">
								Select whether you charge a fixed rate or provide a quote upon a
								request.
							</p>
						</div>

						<div className="flex flex-col sm:px-10 px-6">
							<div className="flex justify-between sm:gap-6 gap-4 pb-2">
								<div className="flex-1">
									<p className="text-sm">Service Cost (₱):</p>
									<Input
										type="number"
										placeholder="e.g. 3500"
										value={serviceCost ?? ""}
										onChange={(e) => setServiceCost(Number(e.target.value))}
									/>
								</div>

								<div className="flex-1">
									<p className="text-sm">Payment Type:</p>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="gray" className="w-full justify-between">
												{paymentType}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-white">
											{paymentTypes.map((type) => (
												<DropdownMenuItem
													key={type}
													onClick={() => setPaymentType(type)}
												>
													{type}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>

							<div className="flex justify-between sm:gap-6 gap-4 py-2 pb-4">
								<div className="flex-1">
									<p className="text-sm">Agreement Fee (%)</p>
									<Input
										type="number"
										disabled={paymentType === "Fixed Rate"}
										value={agreementFeePercent}
										min={5}
										onChange={(e) =>
											setAgreementFeePercent(
												Math.max(5, Number(e.target.value))
											)
										}
									/>
								</div>

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
