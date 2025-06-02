"use client";

import React, { useEffect, useState } from "react";

import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import SuccessModal from "@/components/modal/SuccessModal";
import { getServiceById, Service } from "@/lib/clients/ViewServiceClient";

interface ServiceDetailsProps {
	serviceId: string;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ serviceId }) => {
	const [selectedStatus, setSelectedStatus] = useState<string>("");
	const [modalType, setModalType] = useState<"success" | null>(null);
	const [service, setService] = useState<Service | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!serviceId) {
				setError("Invalid service ID");
				setLoading(false);
				return;
			}

			const fetchedService = await getServiceById(serviceId);

			setService(fetchedService);
			if (fetchedService) {
				setSelectedStatus(fetchedService.status);
				setError(null);
			} else {
				setError("Service not found");
			}
			setLoading(false);
		};

		fetchData();
	}, [serviceId]);

	const handleSubmit = async () => {
		if (!service) return;

		try {
			const res = await fetch(`/api/services/${service.id}/update-status`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status: selectedStatus }),
			});

			if (!res.ok) throw new Error("Failed to update status");

			setModalType("success");
		} catch (err) {
			console.error("Error updating status:", err);
		}
	};

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

	return (
		<>
			<div className="flex flex-col gap-8 p-4 background-1 rounded-[10px]">
				{/* Status Update Section */}
				<div className="md:flex md:flex-row md:justify-between justify-center flex-col items-center gap-12">
					<div className="flex items-center gap-3 w-full sm:w-fit pt-4">
						<div className="flex flex-col justify-end gap-1 pr-4 border-r border-secondary">
							<span className="text-xs sm:text-sm text-secondary text-end">
								Selected
							</span>
						</div>

						<div className="flex items-center gap-2">
							<select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
								className="border border-gray-300 rounded px-2 py-2 text-sm"
							>
								<option value="pending">Pending</option>
								<option value="active">Active</option>
								<option value="closed">Closed</option>
							</select>

							<ButtonSecondary onClick={handleSubmit}>Submit</ButtonSecondary>
						</div>
					</div>
				</div>

				{/* Service Details Section */}
				<div className="border-t pt-6">
					<h2 className="text-xl font-semibold mb-4">Service Details</h2>

					<div className="grid md:grid-cols-2 gap-4 text-sm">
						<div>
							<span className="font-semibold">Title:</span> {service.title}
						</div>
						<div>
							<span className="font-semibold">Type:</span> {service.type}
						</div>
						<div>
							<span className="font-semibold">Owner:</span> {service.owner_name}
						</div>
						<div>
							<span className="font-semibold">Service Cost:</span> $
							{service.service_cost}
						</div>
						<div>
							<span className="font-semibold">Agreement Fee:</span> $
							{service.agreement_fee}
						</div>
						<div>
							<span className="font-semibold">Convenience Fee:</span> $
							{service.convenience_fee}
						</div>
						<div>
							<span className="font-semibold">Total Price:</span> $
							{service.total_price}
						</div>
						<div>
							<span className="font-semibold">Start Date:</span>{" "}
							{new Date(service.start_date).toLocaleDateString()}
						</div>
						<div>
							<span className="font-semibold">End Date:</span>{" "}
							{new Date(service.end_date).toLocaleDateString()}
						</div>
						<div>
							<span className="font-semibold">Category:</span>{" "}
							{service.category || "N/A"}
						</div>
						<div>
							<span className="font-semibold">Ratings:</span> {service.ratings}
						</div>
						<div>
							<span className="font-semibold">Status:</span> {service.status}
						</div>
					</div>

					<div className="mt-6">
						<h3 className="font-semibold mb-2">Description</h3>
						<p className="text-gray-700">{service.description}</p>
					</div>

					{service.image && (
						<div className="mt-6">
							<h3 className="font-semibold mb-2">Service Image</h3>
							<img
								src={service.image}
								alt="Service"
								className="rounded-md shadow w-full max-w-md"
							/>
						</div>
					)}
				</div>
			</div>

			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Request updated successfully."
					onClose={() => setModalType(null)}
				/>
			)}
		</>
	);
};

export default ServiceDetails;
