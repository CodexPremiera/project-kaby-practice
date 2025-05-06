"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import type { Service } from "@/data/services";
import { RiEditBoxLine, RiStarFill, RiUser2Fill } from "react-icons/ri";

interface ServiceTabProps {
	service: Service;
}

const ServiceTab: React.FC<ServiceTabProps> = ({ service }) => {
	return (
		<div className="w-full max-w-screen  sm:pb-4 pb-0">
			<div className="flex flex-row items-center justify-between  bg-white rounded-lg px-6">
				{/* Service Title */}
				<div className="flex flex-col text-left my-4">
					<p className="text-sm font-medium">{service.title}</p>
				</div>

				{/* Service Stats & Action */}
				<div className="flex gap-6 items-center justify-end">
					<div className="text-sm flex items-center gap-1">
						<span className="font-medium ">{service.rating}</span>
						<RiStarFill className="text-secondary" />
					</div>
					<div className="text-sm flex items-center gap-1">
						<span className="font-medium ">{service.availed}</span>
						<RiUser2Fill className="text-secondary" />
					</div>
					<Link href={`/services/${service.id}/edit`}>
						<RiEditBoxLine className="hover:text-secondary" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ServiceTab;
