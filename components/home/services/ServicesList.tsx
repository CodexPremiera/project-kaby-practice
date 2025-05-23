"use client";

import React, { useEffect, useMemo, useState } from "react";
import ServiceCard from "@/components/services/view/ServiceCard";
import { useRouter, useSearchParams } from "next/navigation";

type ServiceType = {
	id: string;
	status: string;
	owner: string;
	type: string;
	title: string;
	image: string;
	description: string;
	displayBadge?: boolean;
};

type BarangayProfile = {
	user_id: string;
	barangayName: string;
};

type CitizenProfile = {
	user_id: string;
	first_name: string;
	last_name: string;
};

type ServicesWithProfile = ServiceType & {
	profile: BarangayProfile | CitizenProfile | null;
	ownerName: string;
};

interface SearchServiceProps {
	tab: "all" | "frontline" | "around-you";
	userRole: "citizen" | "barangay";
}

const ServicesList: React.FC<SearchServiceProps> = ({ tab, userRole }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	const [services, setServices] = useState<ServicesWithProfile[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentUserId, setCurrentUserId] = useState<string>("");

	const fetchServicesAndProfiles = async () => {
		setLoading(true);
		try {
			let url = "/api/services";
			if (tab === "frontline") url = "/api/services/frontline";
			else if (tab === "around-you") url = "/api/services/aroundyou";

			const resServices = await fetch(url);
			if (!resServices.ok) throw new Error("Failed to fetch services");
			const serviceData: ServiceType[] = await resServices.json();

			const profileApi = "api/auth/login";

			const resProfiles = await fetch(profileApi);
			if (!resProfiles.ok) throw new Error("Failed to fetch profiles");
			const profilesJson = await resProfiles.json();
			const profiles = profilesJson.data || [];

			const servicesWithProfiles: ServicesWithProfile[] = serviceData.map(
				(service) => {
					const profile = profiles.find(
						(p: BarangayProfile | CitizenProfile) => p.user_id === service.owner
					);

					//Logic Using the service.owner I will
					const ownerName =
						userRole === "barangay"
							? (profile as BarangayProfile)?.barangayName || "Unknown Barangay"
							: profile
								? `${(profile as CitizenProfile).first_name} ${(profile as CitizenProfile).last_name}`
								: "Unknown User";

					return { ...service, profile: profile || null, ownerName };
				}
			);

			setServices(servicesWithProfiles);
		} catch (err: any) {
			console.error("Error fetching services or profiles:", err);
			setError(err.message);
			setServices([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchServicesAndProfiles();
	}, [tab, userRole]);

	const filteredAndSearchedServices = useMemo(() => {
		let filtered = services.filter(
			(service) =>
				service.status !== "closed" && service.owner !== currentUserId
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
	}, [services, query, currentUserId]);

	if (loading) return <div>Loading services...</div>;
	if (error) return <div>Error loading services: {error}</div>;

	return (
		<>
			{filteredAndSearchedServices.map((service) => (
				<ServiceCard
					key={service.id}
					service={{
						id: service.id,
						title: service.title,
						owner: service.ownerName,
						type: service.type,
						image: service.image,
						displayBadge: service.displayBadge,
						status: service.status,
					}}
					onSelect={(id) => router.push(`/services/${id}`)}
				/>
			))}
		</>
	);
};

export default ServicesList;
