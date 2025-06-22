"use client";

import React, { useEffect, useMemo, useState } from "react";
import ServiceCard from "@/components/services/view/ServiceCard";
import { useSearchParams } from "next/navigation";
import { getCurrentUser } from "@/lib/clients/useAuthClient";
import LoadingModal from "@/components/modal/LoadingModal";

type ServiceType = {
	id: string;
	status: string;
	owner: string;
	type: string;
	title: string;
	image: string;
	description: string;
	display_badge: boolean;
	end_date: Date | null;
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

interface YourServicesListProps {
	tab: "active" | "closed";
}

const YourServicesList: React.FC<YourServicesListProps> = ({ tab }) => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q")?.toLowerCase() || "";

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [services, setServices] = useState<ServicesWithProfile[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const user = await getCurrentUser();
				if (!user) throw new Error("User not found");

				const resServices = await fetch("/api/services");
				if (!resServices.ok) throw new Error("Failed to fetch services");
				const serviceData: ServiceType[] = await resServices.json();

				let profiles: BarangayProfile[] | CitizenProfile[] = [];

				if (user.role === "barangay") {
					const resBarangayProfiles = await fetch("/api/barangay");
					if (!resBarangayProfiles.ok)
						throw new Error("Failed to fetch barangay profiles");
					profiles = (await resBarangayProfiles.json()).data || [];
				} else if (user.role === "citizen") {
					const resCitizenProfiles = await fetch("/api/citizen");
					if (!resCitizenProfiles.ok)
						throw new Error("Failed to fetch citizen profiles");
					profiles = (await resCitizenProfiles.json()).data || [];
				}

				const matchedProfile =
					profiles.find((p) => p.user_id === user.user_id) || null;

				const filteredServices = serviceData
					.filter(
						(service) =>
							service.owner === user.user_id &&
							service.status.toLowerCase() === tab &&
							service.title.toLowerCase().includes(query)
					)
					.map((service) => {
						let ownerName = "Unknown User";

						if (user.role === "barangay" && matchedProfile) {
							ownerName = (matchedProfile as BarangayProfile).barangayName;
						} else if (user.role === "citizen" && matchedProfile) {
							const citizenProfile = matchedProfile as CitizenProfile;
							ownerName = `${citizenProfile.first_name} ${citizenProfile.last_name}`;
						}

						return {
							...service,
							ownerName,
							profile: matchedProfile,
						};
					});

				setServices(filteredServices);
			} catch (err: any) {
				setError(err.message || "Unknown error");
				setServices([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [tab, query]);

	if (loading)
		return (
			<div>
				<LoadingModal title="Loading Services" content="Please wait..." />
			</div>
		);
	if (error) return <div>Error loading services: {error}</div>;

	return (
		<>
			{services.map((service) => (
				<ServiceCard
					key={service.id}
					service={{
						id: service.id,
						title: service.title,
						owner: service.ownerName,
						type: service.type,
						image: service.image,
						display_badge: service.display_badge,
						status: service.status,
						end_date: service.end_date
					}}
					routePrefix="/services/:id/request"
				/>
			))}
		</>
	);
};

export default YourServicesList;
