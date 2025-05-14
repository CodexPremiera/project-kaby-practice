"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ServiceCard from "../view/ServiceCard";

type ActiveServiceProps = {
	userId: string;
	userRole: string;
};

const ActiveService: React.FC<ActiveServiceProps> = ({ userId, userRole }) => {
	const [services, setServices] = useState<any[]>([]); // State to store all services
	const [loading, setLoading] = useState<boolean>(true); // Loading state
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

	// Handle service card selection
	const handleServiceSelect = (id: string) => {
		router.push(`/services/${id}`);
	};

	// Filter the services to show only the closed services owned by the current user
	const closedServices = services.filter(
		(service) => service.owner === userId && service.status === "Closed"
	);

	if (loading) {
		return (
			<div className="text-center py-10 text-gray-500">Loading services...</div>
		);
	}

	// If no active services found
	if (closedServices.length === 0) {
		return (
			<div className="text-center py-10 text-gray-500">
				No closed services found.
			</div>
		);
	}

	return (
		<div className="grid justify-center gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mx-auto justify-items-center py-4">
			{closedServices.map((service) => (
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
