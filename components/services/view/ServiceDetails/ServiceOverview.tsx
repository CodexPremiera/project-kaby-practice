import React from "react";
import { Service } from "@/lib/clients/ViewServiceClient";
import Image from "next/image";
import { getPublicUrl } from "@/utils/supabase/storage";
import { formatDate } from "@/lib/utils";

interface Props {
	service: Service | null;
	setService: React.Dispatch<React.SetStateAction<Service | null>>;
}

const ServiceOverview: React.FC<Props> = ({ service, setService }) => {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (!service) return;
		const { name, value } = e.target;
		setService((prev) => (prev ? { ...prev, [name]: value } : prev));
	};

	const handleSubmit = () => {
		console.log("Save Overview Changes:", service);
		// call your PUT API here (updateService(service))
	};

	if (!service) return <p>No service data available</p>;

	return (
		<div className="flex flex-col">
			<div className="pb-4">
				<div className="font-semibold text-xl">{service.title}</div>

				<div className="flex justify-between">
					<div>
						<div className="text-sm text-gray-500">
							Service Type: {service.type}
						</div>
						<div className="text-sm text-gray-500">
							Service Category: {service.category}
						</div>
					</div>

					<div>
						<div className="text-sm text-gray-500">
							Display Badge: {service.display_badge}
							Eligible For Badges: {service.eligible_for_badges}
						</div>
						<div className="text-sm text-gray-500">
							Schedule: {formatDate(service.start_date)} •{" "}
							{formatDate(service.end_date)}
						</div>
					</div>
				</div>
			</div>

			<div className="flex w-full h-[220px] rounded-lg overflow-hidden relative">
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
			</div>

			<div className="mt-4">
				<textarea
					name="description"
					value={service.description}
					onChange={handleChange}
					className=" p-2 w-full border border-gray-300 rounded-[10px] text-sm"
					rows={16}
				/>
			</div>

			<div className="flex justify-end w-full">
				<button
					onClick={handleSubmit}
					className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-opacity-90"
				>
					Save Overview
				</button>
			</div>
		</div>
	);
};

export default ServiceOverview;
