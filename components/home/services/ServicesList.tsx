"use client";

import React, { useEffect, useMemo, useState } from "react";
import ServiceCard from "@/components/services/view/ServiceCard";
import { useRouter, useSearchParams } from "next/navigation";

interface Service {
	id: string;
	status: string;
	owner: string;
	type: string;
	title: string;
	image: string;
	description: string;
}

interface SearchServiceProps {
	tab: "all" | "frontline" | "around-you";
}

const ServicesList: React.FC<SearchServiceProps> = ({ tab }) => {
	const router = useRouter();
	const currentUser = "Bondy Might"; // Replace with auth logic later
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	const [services, setServices] = useState<Service[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchServices() {
			try {
				let url = "/api/services";
				if (tab === "frontline") {
					url = "/api/services/frontline";
				} else if (tab === "around-you") {
					url = "/api/services/aroundyou";
				}

				const res = await fetch(url);
				if (!res.ok) throw new Error("Failed to fetch services");
				const data = await res.json();
				setServices(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchServices();
	}, [tab]);

	const filteredAndSearchedServices = useMemo(() => {
		let filtered = services.filter(
			(service) => service.status !== "closed" && service.owner !== currentUser
		);

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
	}, [services, query]);

	if (loading) return <div>Loading services...</div>;
	if (error) return <div>Error loading services: {error}</div>;

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
