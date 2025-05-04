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
import { useState } from "react";
import DatePicker from "@/components/services/DatePicker";
import PaymentArrangement from "@/components/services/PaymentArrangement";
import Link from "next/link";

interface CreateServiceProps {
	onClose: () => void;
}

const serviceTypes = ["Barangay", "Personal", "Event"];
const yesNoOptions = ["Yes", "No"];
const dateOptions = ["Available Date", "Not Applicable"];

const CreateService: React.FC<CreateServiceProps> = ({ onClose }) => {
	const [serviceType, setServiceType] = useState("Barangay");
	const [dateOption, setDateOption] = useState("Available Date");

	return (
		<div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-6">
			<div className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex flex-col gap-6">
					<div className="flex justify-between items-center py-3 pt-5 bg-secondary">
						<div className="text-medium font-semibold text-white px-6">
							Create Service
						</div>
						<div className="absolute top-4 right-4 cursor-pointer">
							<RiCloseLine
								className="w-6 h-6 text-black hover:text-white"
								onClick={onClose}
							/>
						</div>
					</div>

					{/* Form content goes here */}
					<div className="flex flex-col md:flex-row gap-6 py-2 px-6">
						<div className="w-[360px] h-[255px] flex justify-center items-center bg-black/80 rounded-lg overflow-hidden text-white">
							Upload
						</div>
						<div className="flex flex-col w-full gap-4">
							<div className="flex flex-col flex-1">
								<p className="text-sm">Service Name:</p>
								<Input placeholder="Enter name" />
							</div>

							{/* Service Type + Schedule Option + DatePickers */}
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

							<div className="flex flex-col flex-1">
								<p className="text-sm">Description:</p>
								<textarea
									placeholder="Enter service description"
									className="border border-gray-300 rounded-md px-3 py-2 text-sm h-41 resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/30 focus-visible:border-ring w-full overflow-y-auto"
								/>
							</div>
						</div>
					</div>

					{/* Payment Arrangement */}
					<PaymentArrangement />
					{/* Create Button */}
					<Link href="/services/1/edit">
						<div className="flex flex-col sm:flex-row justify-end pb-6 px-6">
							<Button className="w-full sm:w-auto">Create</Button>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CreateService;
