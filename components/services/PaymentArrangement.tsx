"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

const PaymentArrangement = () => {
	const paymentTypes = ["Fixed Rate", "Quote"];

	// Initialize serviceCost as number | undefined to allow for correct type checking
	const [serviceCost, setServiceCost] = useState<number | undefined>(undefined);
	const [paymentType, setPaymentType] = useState("Fixed Rate");
	const [agreementFeePercent, setAgreementFeePercent] = useState<number>(100);

	// Calculate the Agreement Fee Value and ensure serviceCost is a valid number
	const agreementFeeValue = serviceCost
		? paymentType === "Fixed Rate"
			? serviceCost
			: Math.max(serviceCost * (agreementFeePercent / 100), serviceCost * 0.05)
		: 0;

	// Convenience fee calculation, fixed 5% of the service cost
	const convenienceFee = agreementFeeValue * 0.03;

	// Calculate total price by summing agreement fee and convenience fee
	const totalPrice = agreementFeeValue + convenienceFee;

	// Effect hook to reset the agreement fee percent if "Fixed Rate" is selected
	useEffect(() => {
		if (paymentType === "Fixed Rate") {
			setAgreementFeePercent(100);
		}
	}, [paymentType]);

	return (
		<div>
			<div className="space-y-4 pb-4">
				<div>
					<div className="bg-gray-200 py-2">
						<p className="font-semibold text-sm px-6">Payment Arrangement</p>
					</div>

					<p className="text-sm px-6 sm:py-2 py-5">
						Select whether you charge a fixed rate or provide a quote upon a
						request.
					</p>
				</div>

				<div className="flex flex-col sm:px-10 px-6">
					<div className="flex justify-between sm:gap-6 gap-4 pb-2">
						{/* Service Cost Input */}
						<div className="flex-1">
							<p className="text-sm ">Service Cost (₱):</p>
							<div>
								<Input
									type="number"
									placeholder="e.g. 3500"
									value={serviceCost ?? ""}
									onChange={(e) => setServiceCost(Number(e.target.value))}
								/>
							</div>
						</div>

						{/* Payment Type Dropdown */}
						<div className="flex-1">
							<p className="text-sm ">Payment Type:</p>

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
						{/* Agreement Fee Section */}
						<div className="flex-1">
							<p className="text-sm ">Agreement Fee (%)</p>
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
							<p className="text-sm ">Agreement Fee Value (₱)</p>
							<Input
								type="text"
								value={agreementFeeValue.toFixed(2)}
								disabled
							/>
						</div>
					</div>
					<div className="sm:py-2 py-4">
						{/* Convenience Fee Section */}
						<div className="flex justify-between text-sm py-2">
							<p className="text-gray-600">Convenience Fee (+5%)</p>
							<p className="font-semibold">₱{convenienceFee.toFixed(2)}</p>
						</div>

						{/* Total Price Section */}
						<div className="flex justify-between font-semibold text-secondary">
							<p>Total Price:</p>
							<p>₱{totalPrice.toFixed(2)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentArrangement;
