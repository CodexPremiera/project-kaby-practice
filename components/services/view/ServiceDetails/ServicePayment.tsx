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
import { calculatePayment } from "@/lib/utils";

interface Props {
	service: Service | null;
	setService: React.Dispatch<React.SetStateAction<Service | null>>;
}

interface PaymentForm {
	serviceCost: number;
	paymentType: string;
	agreementFeePercent: number;
	agreementFeeValue: number;
	convenienceFee: number;
	totalPrice: number;
}

const ServicePayment: React.FC<Props> = ({ service, setService }) => {
	const paymentTypes = ["Fixed", "Quote"];

	const [form, setForm] = useState<PaymentForm>(() => ({
		serviceCost: service?.service_cost ?? 0,
		paymentType: service?.payment_type || "Fixed",
		agreementFeePercent: service?.percentage ?? 5,
		agreementFeeValue: service?.agreement_fee ?? 0,
		convenienceFee: service?.convenience_fee ?? 0,
		totalPrice: service?.total_price ?? 0,
	}));

	useEffect(() => {
		if (!service) return;

		const { agreementFeeValue, convenienceFee, totalPrice } = calculatePayment(
			form.serviceCost,
			form.paymentType,
			form.agreementFeePercent
		);

		setForm((prev) => ({
			...prev,
			agreementFeeValue,
			convenienceFee,
			totalPrice,
		}));

		setService((prev) =>
			prev
				? {
						...prev,
						service_cost: form.serviceCost,
						payment_type: form.paymentType,
						percentage: form.agreementFeePercent,
						agreement_fee: agreementFeeValue,
						convenience_fee: convenienceFee,
						total_price: totalPrice,
					}
				: prev
		);
	}, [form.serviceCost, form.paymentType, form.agreementFeePercent]);

	if (!service) return <p>No payment data available</p>;

	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<div className="text-xl font-semibold">Payment Details</div>
				<div
					className={`w-3 h-3 rounded-full ${
						service.status === "Active" ? "bg-green-400" : "bg-gray-400"
					}`}
					title={`Status: ${service.status}`}
				/>
			</div>

			<div className="flex flex-col gap-2 text-sm py-6">
				{/* Service Cost */}
				<div className="flex items-center gap-2 w-full">
					<span className="text-sm text-gray-500 whitespace-nowrap">
						Service Cost (₱):
					</span>
					<Input
						type="number"
						value={form.serviceCost}
						min={0}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								serviceCost: Math.max(0, Number(e.target.value)),
							}))
						}
						className="flex-1"
					/>
				</div>

				{/* Payment Type & Percentage */}
				<div className="flex flex-col sm:flex-row w-full gap-4 pt-2">
					<div className="flex items-center gap-2 w-full">
						<span className="text-sm text-gray-500 whitespace-nowrap">
							Payment Type:
						</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="gray" className="flex-1 justify-between">
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
												agreementFeePercent: type === "Fixed" ? 100 : 5,
											}))
										}
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
							disabled={form.paymentType === "Fixed"}
							value={form.agreementFeePercent}
							min={5}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									agreementFeePercent: Math.max(5, Number(e.target.value)),
								}))
							}
							className="flex-1"
						/>
					</div>
				</div>

				{/* Agreement Fee */}
				<div className="flex items-center gap-2 w-full pt-2">
					<span className="text-sm text-gray-500 whitespace-nowrap">
						Agreement Fee Value (₱):
					</span>
					<Input
						type="text"
						value={form.agreementFeeValue.toFixed(2)}
						disabled
						className="flex-1"
					/>
				</div>

				{/* Convenience Fee & Total */}
				<div className="py-4">
					<div className="flex justify-between text-sm py-2">
						<span className="text-gray-600">Convenience Fee (+3%)</span>
						<span className="font-semibold">
							₱{form.convenienceFee.toFixed(2)}
						</span>
					</div>
					<div className="flex justify-between text-xl font-semibold text-secondary">
						<span>Total Price (₱):</span>
						<span>
							{form.serviceCost === 0
								? "Free"
								: `₱${form.totalPrice.toFixed(2)}`}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicePayment;
