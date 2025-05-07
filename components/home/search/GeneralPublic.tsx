"use client";

import React from "react";
import { services } from "@/data/services";
import ServiceCard from "@/components/services/view/ServiceCard";
import { useRouter } from "next/navigation";

const GeneralPublic: React.FC = () => {
	const router = useRouter();
	const currentUser = "Bondy Might"; // Replace with auth logic later

	const filteredServices = services.filter(
		(service) => service.status !== "closed" && service.owner !== currentUser
	);

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
			{filteredServices.map((service) => (
				<ServiceCard
					key={service.id}
					service={service}
					onSelect={() => router.push(`/services/${service.id}`)}
				/>
			))}
		</div>
	);
};

export default GeneralPublic;
