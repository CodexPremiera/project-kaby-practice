"use client";

import React, { useEffect, useState } from "react";
import ServiceCard from "@/components/services/view/ServiceCard";
import { useRouter } from "next/navigation";

interface Service {
	id: string;
	status: string;
	owner: string;
	type: string;
	title: string;
	image: string;
	description?: string;
}

const Frontline: React.FC = () => {
	const router = useRouter();
	const [services, setServices] = useState<Service[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchServices = async () => {
		try {
			const res = await fetch("/api/services/frontline");
			if (!res.ok) throw new Error("Failed to fetch services");
			const data: Service[] = await res.json();

			const filtered = data.filter(
				(service) => service.status !== "closed" && service.type === "Barangay"
			);

			setServices(filtered);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchServices();
	}, []);

	const handleSelect = (service: Service) => {
		router.push(`/services/${service.id}`);
	};

	if (loading) return <div>Loading services...</div>;
	if (error) return <div>Error loading services: {error}</div>;

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
			{services.map((service) => (
				<ServiceCard
					key={service.id}
					service={service}
					onSelect={() => handleSelect(service)}
				/>
			))}
		</div>
	);
};

export default Frontline;
