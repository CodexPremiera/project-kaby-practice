"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	RiStarFill,
	RiAlarmLine,
	RiUser2Fill,
	RiVipCrown2Fill,
} from "react-icons/ri";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getPublicUrl } from "@/utils/supabase/storage";
import { getCurrentUser, getServiceById, Service } from "./ViewServiceClient";
import { format } from "date-fns";

const ViewService: React.FC = () => {
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	const [service, setService] = useState<Service | null>(null);
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!id) {
				setError("Invalid service ID");
				setLoading(false);
				return;
			}

			const [user, fetchedService] = await Promise.all([
				getCurrentUser(),
				getServiceById(id),
			]);

			setCurrentUserId(user);
			setService(fetchedService);
			setError(!fetchedService ? "Service not found" : null);
			setLoading(false);
		};

		fetchData();
	}, [id]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p>Loading service details...</p>
			</div>
		);
	}

	if (error || !service) {
		return (
			<div className="flex items-center justify-center min-h-screen p-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">
						{error ? "Service Not Found" : "No service data available"}
					</h1>
					<p className="text-gray-500">
						{error || "No service information could be retrieved."}
					</p>
				</div>
			</div>
		);
	}

	// To disable Add To Tracker and Avail Services Button if the service owner is the current logged in user
	const isOwner = currentUserId === service.owner;

	return (
		<div className="flex flex-col md:flex-row max-w-7xl mx-auto sm:h-[550px] h-full py-2">
			<div className="w-full rounded-[10px] bg-white">
				<div className="flex flex-row justify-between items-center border-b p-4 mb-4 border-gray-200 text-md font-semibold px-6">
					<div>{service.title}</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<span>{service.ratings}</span>
							<RiStarFill className="text-secondary" />
						</div>
						<div className="flex items-center gap-1">
							<span>{service.no_of_avail}</span>
							<RiUser2Fill className="text-secondary" />
						</div>

						{service.display_badge && (
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
						By: {service.owner_name} • {service.type}
					</p>
					<div className="flex items-center gap-2">
						<RiAlarmLine />
						<span>
							Scheduled:{" "}
							{service.end_date
								? `${format(new Date(service.start_date), "MMM d")}-${format(new Date(service.end_date), "d, yyyy")}`
								: "Not Applicable"}
						</span>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-6 mb-6 px-6 pt-8">
					<div className="w-full md:w-[460px] aspect-[10/9] flex justify-center items-center bg-black/80 rounded-lg overflow-hidden p-4 relative">
						<Image
							src={
								service.image
									? getPublicUrl(service.image, "services-pictures")
									: "/default-image.jpg"
							}
							alt={`${service.title} image`}
							fill
							className="object-contain"
						/>
					</div>

					<div className="flex flex-col w-full gap-4 text-sm">
						<div className="flex justify-between">
							<div className="flex-1">
								<p className="text-sm">Service Fee:</p>
								<p className="font-semibold text-secondary text-lg">
									{service.service_cost}
								</p>
							</div>
							<div className="flex-1">
								<p className="text-sm">Agreement Fee:</p>
								<p className="font-semibold text-secondary text-lg">
									{service.agreement_fee}
								</p>
							</div>
						</div>

						<div>
							<p>Description:</p>
							<div className="bg-gray-100 rounded-lg px-4 py-3 h-[220px] overflow-y-auto text-sm text-gray-700">
								{service.description}
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-between items-center gap-3 py-4 px-5">
					<div className="sm:col-span-1 italic text-gray-500 text-xs">
						Note: Adding this service to your tracker will allow you to chat
						with the owner.
					</div>
					<div className="flex items-center gap-4">
						<Button
							variant="outline"
							onClick={() => router.push(`/tracker`)}
							disabled={isOwner}
							title={isOwner ? "You are the service owner" : undefined}
						>
							Add to Tracker
						</Button>
						<Button
							variant="secondary"
							onClick={() =>
								router.push(`/services/${service.id}/requirements`)
							}
							disabled={isOwner}
							title={isOwner ? "You are the service owner" : undefined}
						>
							Avail Service
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewService;
