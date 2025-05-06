"use client";

import React from "react";
import { useRouter } from "next/navigation";// Import ServiceCard
import { services } from "@/data/services"; // Assuming this is in a separate file
import ServiceCard from "../view/ServiceCard";

const ActiveService: React.FC = () => {
	const currentUser = "Bondy Might"; // Replace with actual user data
	const router = useRouter();

	const handleServiceSelect = (id: string) => {
		router.push(`/services/${id}`);
	};

	const activeServices = services.filter(
		(service) => service.owner === currentUser && service.status === "active"
	);

	return (
		<div className="grid justify-center gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mx-auto justify-items-center py-4">
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
