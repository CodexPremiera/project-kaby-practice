"use client";

import React, { useMemo } from "react";
import { services } from "@/data/services";
import ServiceCard from "@/components/services/view/ServiceCard";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchServiceProps {
	type?: string[];
}

const ServicesList: React.FC<SearchServiceProps> = ({ type = [] }) => {
	const router = useRouter();
	const currentUser = "Bondy Might"; // Replace with auth logic later
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	const filteredAndSearchedServices = useMemo(() => {
		// Step 1: Filter by status, owner, and type
		let filtered = services.filter(
			(service) =>
				service.status !== "closed" &&
				service.owner !== currentUser &&
				(type.length === 0 || type.includes(service.type))
		);

		// Step 2: If query exists, filter by title/owner/description
		if (query.trim() !== "") {
			const normalizedQuery = query.toLowerCase().trim();
			filtered = filtered.filter(
				(service) =>
					service.title.toLowerCase().includes(normalizedQuery) ||
					service.owner.toLowerCase().includes(normalizedQuery) ||
					service.description.toLowerCase().includes(normalizedQuery)
			);
		}

		return filtered;
	}, [query, type]);

	return (
		<>
			{filteredAndSearchedServices.map((service) => (
				<ServiceCard
					key={service.id}
					service={service}
					onSelect={() => router.push(`/services/${service.id}`)}
				/>
			))}
		</>
	);
};

export default ServicesList;
