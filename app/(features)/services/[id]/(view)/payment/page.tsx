"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PageProps {
	params: Promise<{ id: string }>;
}

const Payment: React.FC<PageProps> = ({ params }) => {
	const router = useRouter();
	const currentUser = "Bondy Might"; // Replace with your auth later

	const { id } = use(params);
	const service = services.find((s) => s.id === id);

	if (!service) {
		return (
			<div className="flex items-center justify-center min-h-screen p-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
					<p className="text-gray-500">
						The service you’re looking for doesn’t exist.
					</p>
				</div>
			</div>
		);
	}

	const isOwner = currentUser === service.owner;

	const shouldShowBadge =
		(service.type === "Barangay" && service.eligibleForBadges === "Yes") ||
		((service.type === "Personal" || service.type === "Event") &&
			service.displayBadge === "Yes");

	return (
		<div className="flex flex-col md:flex-row  max-w-7xl mx-auto sm:h-[550px] h-full py-2">
			<div className="w-full rounded-[10px] bg-white">
				<div className="flex flex-row items-center  border-b p-4 mb-4 border-gray-200 px-6 gap-3">
					<div className="font-semibold text-md">Scheduled Date: April 4th</div>
					<p className="text-gray-600 text-sm">Friday</p>
				</div>

				<div className="flex flex-col md:flex-row gap-6 mb-6 px-6 ">
					<div className="flex-1 flex-col w-full gap-4 border border-gray-200 py-4 rounded-[10px]">
						<div className="flex-1">
							<p className="text-sm font-semibold border-b border-gray-200 pb-4 px-4">
								{service.title}
							</p>
							<p className="px-4 pt-1 text-sm">
								By: {service.owner} • {service.type}
							</p>
						</div>
						<div className="flex-1 py-6 px-4 text-sm">
							<p className="pb-1">Note:</p>
							<div className="bg-gray-100 rounded-lg p-5 h-auto overflow-y-auto text-gray-600 text-xs text-justify">
								<ul className="list-disc pl-4">
									<li>The Agreement Fee is non-refundable once paid.</li>
									<li>
										The Service Fee will be paid based on your agreement with
										the service-provider, either online or in person.
									</li>
								</ul>
							</div>
						</div>
						{/* Payment Details */}
						<div className="flex flex-col gap-4 py-4 px-8 pb-4">
							<div>
								<div className="text-sm flex justify-between ">
									<p>Service Fee:</p>
									<p>{service.feeRange}</p>
								</div>
								<div className="text-sm flex justify-between">
									<p>Agreement Fee:</p>
									<p>{service.agreementFee}</p>
								</div>
							</div>
							<div>
								<div className="text-sm flex justify-between ">
									<p>Convenience Fee:</p>
									<p>{service.convenienceFee}</p>
								</div>
								<div className="flex justify-between items-center font-semibold">
									<p className="text-sm">Total Due:</p>
									<p className="text-lg  text-secondary">
										{`₱${(
											parseFloat(
												service.convenienceFee.replace(/[^\d.-]/g, "")
											) +
											parseFloat(service.agreementFee.replace(/[^\d.-]/g, ""))
										).toFixed(2)}`}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1 flex-col w-full gap-4 py-4 rounded-[10px] space-y-6">
						{/* Payment Method */}
						<div className="flex flex-col space-y-3 px-4">
							<h2 className="text-sm font-semibold text-gray-800">
								Payment Method
							</h2>
							<div className="flex items-center justify-center border border-gray-300 rounded-[10px] cursor-pointer hover:bg-gray-50 w-25 h-10">
								<img
									src="/assets/gcash-logo.png"
									alt="GCash"
									className="w-20 h-20 object-contain"
								/>
							</div>
						</div>

						{/* Billing Information */}
						<div className="flex flex-col space-y-3 px-4">
							<h2 className="text-sm font-semibold text-gray-800">
								Billing Information
							</h2>
							<div className="flex gap-4">
								<Input type="text" placeholder="Country" />
								<Input type="text" placeholder="ZIP Code" />
							</div>
						</div>

						{/* Terms Notice */}
						<div className="flex-1 text-sm text-gray-600">
							<div className="rounded-lg py-5 px-4 h-auto overflow-y-auto text-xs text-justify">
								By proceeding with this payment, I confirm that I have reviewed
								and accepted these terms. I understand that once the Agreement
								Fee is paid, it cannot be refunded, and the Service Fee will be
								handled according to my arrangement with the provider.
							</div>
						</div>
					</div>
				</div>
				{/* Action Buttons */}
				{isOwner ? (
					<div className="flex items-end justify-end px-6 w-full">
						<div>
							<Button
								onClick={() => router.push(`/services/${service.id}/request`)}
							>
								Manage Request
							</Button>
						</div>
					</div>
				) : (
					<>
						<div className="flex justify-between items-center gap-3 px-6">
							<Button
								variant="gray"
								onClick={() =>
									router.push(`/services/${service.id}/requirements`)
								}
							>
								Back
							</Button>
							<Button
								variant="secondary"
								onClick={() => router.push(`/services/${service.id}/payment`)}
							>
								Proceed
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Payment;
