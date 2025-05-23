"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Crown as BadgeIcon } from "lucide-react";
import { getPublicUrl } from "@/utils/supabase/storage";

interface Service {
	id: string;
	title: string;
	owner: string;
	type: string;
	image: string;
	displayBadge?: boolean;
	status?: string;
}

interface ServiceCardProps {
	service: Service;
	onSelect?: (id: string) => void;
	routePrefix?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
	service,
	onSelect,
	routePrefix,
}) => {
	const router = useRouter();
	const currentUser = "Bondy Might"; // Replace with your auth later
	const isOwner = currentUser === service.owner;

	const handleClick = () => {
		if (onSelect) {
			onSelect(service.id);
		} else if (routePrefix) {
			const path = routePrefix.includes(":id")
				? routePrefix.replace(":id", service.id)
				: `${routePrefix}/${service.id}`;

			router.push(path);
		} else {
			router.push(`/services/${service.id}`);
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleClick();
				}
			}}
			className={`flex flex-col border border-light-color w-full cursor-pointer transition-opacity duration-300 rounded-xl background-1 ${
				service.status === "Closed" ? "opacity-50" : ""
			}`}
		>
			<div className="relative w-full h-[140px] sm:h-[180px] md:h-[160px] lg:h-[144px] xl:h-[180px] overflow-hidden rounded-t-[10px]">
				<Image
					src={
						service.image
							? getPublicUrl(service.image, "services-pictures")
							: "/default-image.jpg"
					}
					alt={`${service.title} image`}
					fill
					className="object-cover"
				/>
				{service.displayBadge && (
					<span className="absolute top-2 right-2 bg-accent rounded-full p-1.5">
						<BadgeIcon size={16} color="white" fill="white" />
					</span>
				)}
			</div>

			<div className="px-6 pt-3 pb-5">
				<p className="font-semibold">{service.title}</p>
				<p className="flex gap-1 text-secondary">
					<span>{service.owner}</span>
					<span>•</span>
					<span>{service.type}</span>
				</p>
			</div>
		</div>
	);
};

export default ServiceCard;