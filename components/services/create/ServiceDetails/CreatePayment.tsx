"use client";

import React, { useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentFormData } from "@/app/(features)/services/create/page";
import { calculatePayment } from "@/lib/utils";

interface CreatePaymentProps {
	formData: PaymentFormData;
	updateFormData: (field: keyof PaymentFormData, value: any) => void;
}

const paymentTypes = ["Fixed", "Quote"] as const;

const CreatePayment: React.FC<CreatePaymentProps> = ({
	formData,
	updateFormData,
}) => {
	// Whenever service_cost, payment_type or percentage changes — recalculate fees
	useEffect(() => {
		const { agreementFeeValue, convenienceFee, totalPrice } = calculatePayment(
			formData.service_cost,
			formData.payment_type,
			formData.percentage
		);

		if (
			agreementFeeValue !== formData.agreement_fee ||
			convenienceFee !== formData.convenience_fee ||
			totalPrice !== formData.total_price
		) {
			updateFormData("agreement_fee", agreementFeeValue);
			updateFormData("convenience_fee", convenienceFee);
			updateFormData("total_price", totalPrice);
		}
	}, [
		formData.service_cost,
		formData.payment_type,
		formData.percentage,
		formData.agreement_fee,
		formData.convenience_fee,
		formData.total_price,
		updateFormData,
	]);

	return (
		<div className="flex flex-col gap-4">
			<div className="text-xl font-semibold">Payment Details</div>
			<div className="text-sm">
				Enter the service cost and payment type. Fees are calculated
				automatically.
			</div>

			{/* Service Cost */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-gray-500 whitespace-nowrap">
					Service Cost (₱):
				</span>
				<Input
					type="number"
					value={formData.service_cost}
					min={0}
					onChange={(e) =>
						updateFormData("service_cost", Math.max(0, Number(e.target.value)))
					}
					className="flex-1"
				/>
			</div>

			{/* Payment Type & Percentage */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex items-center gap-2 w-full">
					<span className="text-sm text-gray-500 whitespace-nowrap">
						Payment Type:
					</span>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="gray" className="flex-1 justify-between">
								{formData.payment_type || "Select"}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-white">
							{paymentTypes.map((type) => (
								<DropdownMenuItem
									key={type}
									onClick={() => {
										updateFormData("payment_type", type);
										if (type === "Fixed") {
											updateFormData("percentage", 100);
										}
									}}
								>
									{type}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="flex items-center gap-2 w-full">
					<span className="text-sm text-gray-500 whitespace-nowrap">
						Percentage:
					</span>
					<Input
						type="number"
						disabled={formData.payment_type === "Fixed"}
						value={formData.percentage}
						min={5}
						onChange={(e) =>
							updateFormData("percentage", Math.max(5, Number(e.target.value)))
						}
						className="flex-1"
					/>
				</div>
			</div>

			{/* Agreement Fee */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-gray-500 whitespace-nowrap">
					Agreement Fee (₱):
				</span>
				<Input
					type="text"
					value={formData.agreement_fee}
					disabled
					className="flex-1"
				/>
			</div>
			{/* Convenience Fee & Total */}
			<div className="py-4">
				<div className="flex justify-between text-sm py-2">
					<span className="text-gray-600">Convenience Fee (+3%)</span>
					<span className="font-semibold">
						<Input
							type="text"
							value={formData.convenience_fee}
							disabled
							className="flex-1"
						/>
					</span>
				</div>
				<div className="flex justify-between text-xl font-semibold text-secondary">
					<span>Total Price (₱):</span>
					<span>
						<Input
							type="text"
							value={formData.total_price}
							disabled
							className="flex-1"
						/>
					</span>
				</div>
				<div className="text-sm mt-2">
					Customers will pay this total price upfront to confirm their booking.
					The full service cost will be paid separately in person.
				</div>
			</div>
		</div>
	);
};

export default CreatePayment;
