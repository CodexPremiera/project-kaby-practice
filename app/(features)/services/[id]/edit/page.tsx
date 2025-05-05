"use client";
import DatePicker from "@/components/services/DatePicker";
import PaymentArrangement from "@/components/services/PaymentArrangement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";

const serviceTypes = ["Barangay", "Personal", "Event"];
const dateOptions = ["Available Date", "Not Applicable"];

const EditService = () => {
	const [serviceType, setServiceType] = useState("Barangay");
	const [dateOption, setDateOption] = useState("Available Date");
	return (
		<div>
			<div className="relative rounded-2xl w-full pb-20 sm:px-22 px-0 mt-8">
				<div className="flex flex-col gap-4 bg-white  rounded-t-[20px] ">
					<div className="flex justify-between items-center  py-3 pt-5 bg-gray-100 sm:rounded-t-[20px]">
						<div className="text-medium font-semibold text-black px-10">
							Edit Service
						</div>
					</div>

					{/* Form content goes here */}
					<div className="flex flex-col md:flex-row gap-10 py-2 px-10">
						<div className="flex flex-col">
							<div className="w-[350px] h-[255px] flex justify-center items-center bg-black/80 rounded-lg overflow-hidden text-white ">
								Upload
							</div>
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
					{/* Save Button */}
					<div className="flex flex-col sm:flex-row justify-end pb-6 px-6">
						<Button className="w-full sm:w-auto">Save</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditService;
