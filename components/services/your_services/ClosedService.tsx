"use client";

import React from "react";
import { services } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";
import { useRouter } from "next/navigation";

const ClosedService: React.FC = () => {
	const currentUser = "Bondy Might"; // Replace with auth later
	const router = useRouter();

	return (
		<div
			className="
		grid 
		justify-center
		gap-6
		grid-cols-2 
		sm:grid-cols-2 
		lg:grid-cols-4
		mx-auto
		justify-items-center
		py-4
	  "
		>
			{services
				.filter(
					(service) =>
						service.owner === currentUser && service.status === "closed"
				)
				.map((service) => (
					<ServiceCard
						key={service.id}
						service={service}
						onSelect={() => router.push(`/services/${service.id}`)}
					/>
				))}
		</div>
	);
};

export default ClosedService;
