"use client";

import React from "react";
import Image from "next/image";
import { RiVipCrown2Fill as Badge } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {Crown as BadgeIcon} from "lucide-react";

interface Service {
	id: string;
	title: string;
	owner: string;
	type: string;
	image: string;
	displayBadge?: string;
	status?: string;
}

interface ServiceCardProps {
	service: Service;
	onSelect: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
	const router = useRouter();
	const currentUser = "Bondy Might"; // Replace with your auth later
	const isOwner = currentUser === service.owner;

	const handleClick = () => {
		if (isOwner) {
			router.push(`/services/${service.id}/request`);
		} else {
			onSelect(service.id);
		}
	};
	return (
		<div
			onClick={handleClick}
			className={`flex flex-col border border-light-color w-full cursor-pointer transition-opacity duration-300 rounded-xl background-1 ${
				service.status === "closed" ? "opacity-50" : ""
			}`}
		>
			<div className="relative w-full h-[140px] sm:h-[180px] md:h-[160px] lg:h-[144px] xl:h-[180px] overflow-hidden rounded-t-[10px]">
				<Image
					src={service.image} /*<<< temporarily disabled*/
					/*src={"https://picsum.photos/id/237/200/300"}*/
					alt="service image"
					fill
					className="object-cover"
				/>
				{service.displayBadge === "Yes" && (
					<span className="absolute top-2 right-2 bg-accent rounded-full p-1.5">
						<BadgeIcon size={16} color="white" fill="white"/>
					</span>
				)}
			</div>

			<div className="px-6 pt-3 pb-5">
				<p className="font-semibold">{service.title}</p>
				<p className="flex gap-1">
					<span className="text-secondary">{service.owner}</span>
					<span className="text-secondary">•</span>
					<span className="text-secondary">{service.type}</span>
				</p>
			</div>
		</div>
	);
};

export default ServiceCard;