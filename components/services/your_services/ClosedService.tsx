"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ServiceCard from "../view/ServiceCard";

type UserProps = {
	userId: string;
	userRole: string;
};

type ServiceType = {
	id: string;
	owner: string;
	title: string;
	type: string;
	image: string;
	displayBadge: boolean;
	status: string;
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

type ServiceWithProfile = ServiceType & {
	profile: BarangayProfile | CitizenProfile | null;
	ownerName: string;
};

const ClosedService: React.FC<UserProps> = ({ userId, userRole }) => {
	const [services, setServices] = useState<ServiceWithProfile[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Fetch all services
				const resServices = await fetch("/api/services");
				if (!resServices.ok) throw new Error("Failed to fetch services");
				const serviceData: ServiceType[] = await resServices.json();

				// Fetch profiles list based on userRole
				let profiles: BarangayProfile[] | CitizenProfile[] = [];

				if (userRole === "barangay") {
					const resBarangayProfiles = await fetch("/api/barangay");
					if (!resBarangayProfiles.ok)
						throw new Error("Failed to fetch barangay profiles");
					const barangayProfilesJson = await resBarangayProfiles.json();
					profiles = barangayProfilesJson.data || [];
				} else if (userRole === "citizen") {
					const resCitizenProfiles = await fetch("/api/citizen");
					if (!resCitizenProfiles.ok)
						throw new Error("Failed to fetch citizen profiles");
					const citizenProfilesJson = await resCitizenProfiles.json();
					profiles = citizenProfilesJson.data || [];
				}

				// Find the profile for current userId
				const matchedProfile =
					profiles.find((p) => p.user_id === userId) || null;

				// Filter services owned by user and active
				const myClosedServices = serviceData
					.filter(
						(service) => service.owner === userId && service.status === "Closed"
					)
					.map((service) => {
						let ownerName = "Unknown User";

						if (userRole === "barangay" && matchedProfile) {
							ownerName = (matchedProfile as BarangayProfile).barangayName;
						} else if (userRole === "citizen" && matchedProfile) {
							const citizenProfile = matchedProfile as CitizenProfile;
							ownerName = `${citizenProfile.first_name} ${citizenProfile.last_name}`;
						}

						return { ...service, ownerName, profile: matchedProfile };
					});

				setServices(myClosedServices);
			} catch (err: any) {
				console.error(err);
				setError(err.message || "Unknown error");
				setServices([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [userId, userRole]);

	if (loading) {
		return (
			<div className="text-center py-10 text-gray-500">Loading services...</div>
		);
	}

	if (error) {
		return <div className="text-center py-10 text-red-500">Error: {error}</div>;
	}

	if (services.length === 0) {
		return (
			<div className="text-center py-10 text-gray-500">
				No closed services found.
			</div>
		);
	}

	return (
		<div className="grid justify-center gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mx-auto justify-items-center py-4">
			{services.map((service) => (
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
					routePrefix="/services/:id/request"
				/>
			))}
		</div>
	);
};

export default ClosedService;
