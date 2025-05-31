"use client";

import React, { useState, useEffect } from "react";
import { Service } from "@/lib/clients/ViewServiceClient";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
	service: Service | null;
	setService: React.Dispatch<React.SetStateAction<Service | null>>;
}

const paymentTypes = ["Fixed Rate", "Quote"];

const ServicePayment: React.FC<Props> = ({ service, setService }) => {
	const [paymentType, setPaymentType] = useState("Fixed Rate");
	const [agreementFeePercent, setAgreementFeePercent] = useState(5);

	useEffect(() => {
		if (service) {
			setPaymentType(service.payment_type);
			setAgreementFeePercent(5);
		}
	}, [service]);

	if (!service) return <p>No payment data available</p>;

	// Calculations
	const agreementFeeValue =
		paymentType === "Fixed Rate"
			? service.service_cost
			: (service.service_cost * agreementFeePercent) / 100;

	const convenienceFee = agreementFeeValue * 0.03;
	const totalPrice = agreementFeeValue + convenienceFee;

	const handleSubmit = () => {
		const updatedService = {
			...service,
			paymentType,
			agreementFeePercent,
		};
		console.log("Save Payment Changes:", updatedService);
		// Call your API update here if you like
		setService(updatedService);
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Payment Details</h2>

			<div className="flex flex-col gap-4 text-sm">
				<div className="flex justify-between sm:gap-6 gap-4 pb-2">
					<div className="flex-1">
						<p className="text-sm">Service Cost</p>
						<Input type="number" value={service.service_cost} />
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

					<div className="flex-1">
						<p className="text-sm">Percentage (%)</p>
						<Input
							type="number"
							disabled={paymentType === "Fixed Rate"}
							value={agreementFeePercent}
							min={5}
							onChange={(e) =>
								setAgreementFeePercent(Math.max(5, Number(e.target.value)))
							}
						/>
					</div>
					<div className="flex-1">
						<p className="text-sm">Agreement Fee Value (₱)</p>
						<Input type="text" value={agreementFeeValue.toFixed(2)} disabled />
					</div>
				</div>

				<div className="sm:py-2 py-4">
					<div className="flex justify-between text-sm py-2">
						<p className="text-gray-600">Convenience Fee (+3%)</p>
						<p className="font-semibold">₱{service.convenience_fee}</p>
					</div>

					<div className="flex justify-between font-semibold text-secondary">
						<p>Total Price:</p>
						<p>₱{service.total_price}</p>
					</div>
				</div>
			</div>

			<div className="flex justify-end w-full">
				<button
					onClick={handleSubmit}
					className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-opacity-90"
				>
					Save Payment
				</button>
			</div>
		</div>
	);
};

export default ServicePayment;
