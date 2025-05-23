"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ServiceCard from "../view/ServiceCard";

type ActiveServiceProps = {
	userId: string;
	userRole: string;
};

const ActiveService: React.FC<ActiveServiceProps> = ({ userId, userRole }) => {
	const [services, setServices] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	// Fetch all services from the API
	const fetchServices = async () => {
		try {
			const res = await fetch("/api/services");
			const data = await res.json();
			setServices(data);
			setLoading(false);
		} catch (err) {
			console.error("Error fetching services:", err);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchServices();
	}, []);

	// Handle service card selection — always redirect to /services/request
	const handleServiceSelect = (service: any) => {
		router.push(`/services/${service.id}/request`);
	};

	// Filter active services owned by the current user
	const activeServices = services.filter(
		(service) => service.owner === userId && service.status === "Active"
	);

	if (loading) {
		return (
			<div className="text-center py-10 text-gray-500">Loading services...</div>
		);
	}

	if (activeServices.length === 0) {
		return (
			<div className="text-center py-10 text-gray-500">
				No active services found.
			</div>
		);
	}

	return (
		<div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center py-4">
			{activeServices.map((service) => (
				<ServiceCard
					key={service.id}
					service={service}
					onSelect={handleServiceSelect}
				/>
			))}
		</div>
	);
};

export default ActiveService;
