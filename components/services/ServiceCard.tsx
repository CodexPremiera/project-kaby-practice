"use client";
import React from "react";
import Image from "next/image";
import type { Service } from "@/data/services";
import { RiVipCrown2Fill } from "react-icons/ri";

interface ServiceCardProps {
	service: Service;
	onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
	return (
		<div
			onClick={onSelect}
			className={`flex flex-col border border-gray-200  w-full max-w-xs cursor-pointer transition-opacity duration-300 rounded-[10px] bg-white ${
				service.status === "closed" ? "opacity-50" : ""
			}`}
		>
			<div className="relative w-full h-[140px]  overflow-hidden rounded-t-[10px]">
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

			<div className="px-4 py-4 ">
				<p className="h6 font-medium">{service.title}</p>
				<div className="flex gap-2 flex-wrap text-sm text-gray-600">
					<p>by: {service.owner}</p>
					<p>• {service.type}</p>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
