"use client";

import React from "react";
import Image from "next/image";
import { RiVipCrown2Fill } from "react-icons/ri";

interface ServiceCardProps {
	service: any;
	onSelect: (service: any) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
	return (
		<div
			className={`flex flex-col border border-gray-200 shadow hover:shadow-lg  w-full max-w-xs cursor-pointer transition-opacity duration-300 rounded-[10px] bg-white ${
				service.status === "closed" ? "opacity-50" : ""
			}`}
			onClick={() => onSelect(service)}
		>
			<div className="relative w-full h-[140px] overflow-hidden rounded-t-[10px]">
				<Image
					src={service.image}
					alt="service image"
					fill
					className="object-cover"
				/>
				{service.displayBadge === "Yes" && (
					<RiVipCrown2Fill className="absolute top-2 right-2 text-xl text-secondary" />
				)}
			</div>

			<div className="px-4 py-4">
				<p className="text-sm font-medium">{service.title}</p>
				<div className="flex gap-2 flex-wrap text-sm text-gray-600">
					<p>by: {service.owner}</p>
					<p>• {service.type}</p>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
