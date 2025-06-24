"use client";

import React, { useEffect, useMemo, useState } from "react";
import ServiceCard from "@/components/services/view/ServiceCard";
import { useSearchParams } from "next/navigation";
import ErrorModal from "@/components/modal/ErrorModal";

type ServiceType = {
	id: string;
	status: string;
	owner: string;
	type: string;
	title: string;
	image: string;
	description: string;
	displayBadge?: boolean;
	category?:string;
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
	category: string | null;
}

const ServicesList: React.FC<SearchServiceProps> = ({ tab,category }) => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [services, setServices] = useState<ServicesWithProfile[]>([]);
	const [modalType, setModalType] = useState<"success" | "error" | null>(null);

	useEffect(() => {
		async function fetchServices() {
			try {
				let servicesUrl = null;
				if (tab === "all") {
					servicesUrl = "/api/services";
					// "ALL Services" refers to all citizen-created services across the entire Philippines.
					const [servicesRes, citizensRes] = await Promise.all([
						fetch(servicesUrl),
						fetch("/api/citizen"),
					]);

					if (!servicesRes.ok) throw new Error("Failed to fetch services");
					if (!citizensRes.ok) throw new Error("Failed to fetch citizens");

					const servicesData = await servicesRes.json();
					const citizensData = await citizensRes.json();

					const citizenUserIds = citizensData.data.map(
						(c: CitizenProfile) => c.user_id
					);

					// Filter services where owner is a citizen
					const filteredServices = servicesData.filter((service: ServiceType) =>
						citizenUserIds.includes(service.owner)
					);
					setServices(filteredServices);
				} else if (tab === "frontline" || tab === "around-you") {
					servicesUrl =
						tab === "frontline"
							? "/api/services/frontline"
							: "/api/services/aroundyou";

					const res = await fetch(servicesUrl);
					if (!res.ok) throw new Error(`Failed to fetch ${tab} services`);

					const servicesData = await res.json();
					setServices(servicesData);
				}
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchServices();
	}, [tab]);

	const filteredAndSearchedServices = useMemo(() => {
		let filtered = services.filter((service) => service.status !== "Closed");

		if (category && category.toLowerCase() !== "all") {
			filtered = filtered.filter(
				(service) => service.category?.toLowerCase() === category.toLowerCase()
			);
		}
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
	}, [services, query,category]);

	if (loading) return <div>Loading services...</div>;
	if (error) return <div>Error loading services: {error}</div>;
	// 	const handleMouseEnter = (service: ServicesWithProfile) => {
	// 	if (hoverTimeoutRef.current) {
	// 		clearTimeout(hoverTimeoutRef.current);
	// 	}
	// 	setSelectedService(service);
	// };

	// const handleMouseLeave = () => {
	// 	hoverTimeoutRef.current = setTimeout(() => {
	// 		setSelectedService(null);
	// 	}, 200); // Delay to prevent flickering
	// };

	return (
		<>			
			{/* {filteredAndSearchedServices.map((service) => (
				<div
					key={service.id}
					className="relative w-full flex flex-col"
 					//  className={`relative w-full flex flex-col ${!user ? "pointer-events-none  opacity-80" : ""}`}

					onMouseEnter={() => setSelectedService(service)}
					onMouseLeave={() => setSelectedService(null)}

				
				>
					<ServiceCard
						service={{
							id: service.id,
							title: service.title,
							owner: service.ownerName,
							type: service.type,
							image: service.image,
							display_badge: service.displayBadge,
							status: service.status,
						}}
						routePrefix="/services"
					/>
					{ !user && (
						<div
						className="absolute inset-0 z-50 cursor-not-allowed"
						onClick={(e) =>{
							e.preventDefault();
						} }
						/>
						
					)}
					

					{selectedService?.id === service.id && (
						<div className="absolute top-full left-0 z-50">
							<ServicePreviewPopover service={service} />
						</div>
					)}
				</div>
			))} */}
			<>
			{filteredAndSearchedServices.map((service) => (
				<div
				key={service.id}
				className="relative w-full flex flex-col"
				
				>
				<ServiceCard
					service={{
					id: service.id,
					title: service.title,
					owner: service.ownerName,
					type: service.type,
					image: service.image,
					display_badge: service.displayBadge,
					status: service.status
					}}
					routePrefix="/services"
					
				/>
				{/* Your hover popover if needed */}
				</div>
			))}

			{modalType === "error" && (
				<ErrorModal
				title="Error"
				content="Need to login first."
				onClose={() => setModalType(null)}
				/>
			)}
			</>

		</>
	);
};

export default ServicesList;
