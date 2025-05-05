"use client";

import React, { use } from "react";
import Image from "next/image";
import {
	RiStarFill,
	RiAlarmLine,
	RiUser2Fill,
	RiVipCrown2Fill,
} from "react-icons/ri";
import { useRouter } from "next/navigation";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";

interface PageProps {
	params: Promise<{ id: string }>;
}

const ViewService: React.FC<PageProps> = ({ params }) => {
	const router = useRouter();
	const currentUser = "Bondy Might"; // Replace with your auth later

	// Unwrap the `params` Promise using React.use()
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
		<div className="flex flex-col md:flex-row max-w-7xl mx-auto sm:h-[550px] h-full py-2">
			<div className="w-full rounded-[10px] bg-white">
				<div className="flex flex-row justify-between items-center border-b p-4 mb-4 border-gray-200 text-md font-semibold px-6">
					<div>{service.title}</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<span>4.8</span>
							<RiStarFill className="text-secondary" />
						</div>
						<div className="flex items-center gap-1">
							<span>300</span>
							<RiUser2Fill className="text-secondary" />
						</div>

						{shouldShowBadge && (
							<Button
								variant="secondary"
								size="sm"
								className="font-medium text-sm"
							>
								<RiVipCrown2Fill />
							</Button>
						)}
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-between text-sm px-6">
					<p>
						By: {service.owner} • {service.type}
					</p>
					<div className="flex items-center gap-2">
						<RiAlarmLine />
						<span>Scheduled: Not Applicable</span>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-6 mb-6 px-6 pt-8">
					<div className="w-full md:w-[460px] flex justify-center items-center bg-black/80 rounded-lg overflow-hidden p-4">
						<Image
							src={service.image}
							width={360}
							height={360}
							alt="service image"
							className="rounded-lg"
						/>
					</div>

					<div className="flex flex-col w-full gap-4 text-sm">
						<div className="flex justify-between">
							<div className="flex-1">
								<p className="text-sm">Service Fee:</p>
								<p className="font-semibold text-secondary text-lg">
									{service.feeRange}
								</p>
							</div>
							<div className="flex-1">
								<p className="text-sm">Agreement Fee:</p>
								<p className="font-semibold text-secondary text-lg">
									{service.agreementFee}
								</p>
							</div>
						</div>

						<div>
							<p>Description:</p>
							<div className="bg-gray-100 rounded-lg px-4 py-3 h-[140px] overflow-y-auto text-sm text-gray-700">
								{service.description}
							</div>
						</div>

						<div>
							<p>Requirements Needed:</p>
							<div className="bg-gray-100 rounded-lg px-4 py-3 text-gray-700">
								{service.requirements}
							</div>
						</div>
					</div>
				</div>

				{isOwner ? (
					<div className="flex items-end justify-end px-5 w-full">
						<div>
							<Button
								onClick={() => router.push(`/services/${service.id}/request`)}
							>
								Manage Request
							</Button>
						</div>
					</div>
				) : (
					<div className="flex justify-between items-center gap-3 py-4 px-5">
						<div className="sm:col-span-1 italic text-gray-500 text-xs">
							Note: Adding this service to your tracker will allow you to chat
							with the owner.
						</div>
						<div className="flex items-center gap-4">
							<Button variant="outline">Add to Tracker</Button>
							<Button
								variant="secondary"
								onClick={() =>
									router.push(`/services/${service.id}/requirements`)
								}
							>
								Avail Service
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ViewService;
