"use client";
import React, { useMemo } from "react";
import { Service } from "@/lib/clients/ViewServiceClient";
import Image from "next/image";
import { getPublicUrl } from "@/utils/supabase/storage";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import supabase from "@/lib/supabaseClient";

interface Props {
	service: Service | null;
	setService: React.Dispatch<React.SetStateAction<Service | null>>;
}

const EditOverview: React.FC<Props> = ({ service, setService }) => {
	const serviceTypes = ["Barangay", "Personal", "Event"];
	const serviceCategories = [
		"Environmental",
		"Livelihood Support",
		"Education",
		"Disaster Response",
		"Infrastructure",
		"Social Welfare",
		"Health & Wellness",
		"Beauty & Grooming",
		"Therapeutic & Counseling",
		"Coaching",
		"Pet Care",
		"Household",
		"Legal & Certification",
		"Other",
	];

	// Filter service types based on current service.type
	const filteredServiceTypes = useMemo(() => {
		if (service?.type === "Barangay") return ["Barangay"];
		if (service?.type === "Personal" || service?.type === "Event")
			return ["Personal", "Event"];
		return serviceTypes;
	}, [service?.type]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (!service) return;
		const { name, value } = e.target;

		if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
			const isChecked = e.target.checked;
			setService((prev) => (prev ? { ...prev, [name]: isChecked } : prev));
		} else {
			setService((prev) => (prev ? { ...prev, [name]: value } : prev));
		}
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;

		const file = e.target.files[0];
		const fileExt = file.name.split(".").pop();
		const fileName = `${service?.id}_${Date.now()}.${fileExt}`;
		const filePath = `uploads/${fileName}`;

		const { data, error } = await supabase.storage
			.from("services-pictures")
			.upload(filePath, file, { upsert: true });

		setService((prev) => (prev ? { ...prev, image: filePath } : prev));
	};

	if (!service) return <p>No service data available</p>;

	return (
		<div className="flex flex-col">
			<div className="pb-4">
				<div className="flex items-center justify-between gap-4">
					<label
						htmlFor="title"
						className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0"
					>
						Title:
					</label>

					<input
						id="title"
						type="text"
						name="title"
						value={service.title}
						onChange={handleChange}
						className="font-semibold text-xl border-b border-gray-300 focus:outline-none focus:border-black flex-grow max-w-4xl"
					/>

					<div
						className={`w-3 h-3 rounded-full ${
							service.status === "Active" ? "bg-green-400" : "bg-gray-400"
						}`}
						title={`Status: ${service.status}`}
					/>
				</div>

				<div className="flex flex-col md:flex-row justify-between w-full">
					{/* Service Type and Category and Checkboxes */}
					<div className="flex md:flex-row flex-col md:items-center md:gap-6 gap-4 pt-2">
						<div className="flex items-center justify-between md:gap-4">
							<div className="flex items-center gap-4 min-w-[130px]">
								<p className="text-sm text-gray-500 whitespace-nowrap">Type:</p>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="gray"
											className="min-w-[120px] justify-between"
										>
											{service.type}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="bg-white">
										{filteredServiceTypes.map((opt) => (
											<DropdownMenuItem
												key={opt}
												onClick={() =>
													setService((prev) =>
														prev ? { ...prev, type: opt } : prev
													)
												}
											>
												{opt}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							<div className="flex items-center gap-4">
								<p className="text-sm text-gray-500 whitespace-nowrap">
									Category:
								</p>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="gray"
											className="min-w-[120px] justify-between"
										>
											{service.category}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="bg-white">
										{serviceCategories.map((opt) => (
											<DropdownMenuItem
												key={opt}
												onClick={() =>
													setService((prev) =>
														prev ? { ...prev, category: opt } : prev
													)
												}
											>
												{opt}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>

						<div className="flex gap-4 text-gray-600">
							{(service.type === "Personal" || service.type === "Event") && (
								<label className="flex items-center justify-between gap-3 text-sm cursor-pointer hover:text-gray-800 transition-colors">
									<input
										type="checkbox"
										name="display_badge"
										checked={Boolean(service.display_badge)}
										onChange={handleChange}
										className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
									/>
									Display Badge
									<p className="text-sm text-gray-600 italic px-4">
										You currently have 0 Badges
									</p>
								</label>
							)}

							{service.type === "Barangay" && (
								<label className="flex items-center gap-4 text-sm cursor-pointer hover:text-gray-800 transition-colors">
									<input
										type="checkbox"
										name="eligible_for_badges"
										checked={Boolean(service.eligible_for_badges)}
										onChange={handleChange}
										className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
									/>
									Eligible for Badges
								</label>
							)}
						</div>
					</div>
				</div>
			</div>

			<div
				className={`flex w-full h-[220px] rounded-lg overflow-hidden relative ${
					service.image ? "" : "bg-gray-300 justify-center items-center"
				}`}
			>
				{service.image ? (
					<Image
						src={getPublicUrl(service.image, "services-pictures")}
						alt={`${service.title} image`}
						fill
						className="object-cover"
					/>
				) : (
					<button className="text-gray-600 text-center m-auto select-none">
						Upload a photo
					</button>
				)}
			</div>

			<div className="flex flex-col md:flex-row gap-4 py-2">
				{/* Image Upload / Remove Buttons */}
				<div className="flex flex-row gap-4 flex-1 w-full">
					<label
						htmlFor="image-upload"
						className="cursor-pointer px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 text-center flex-1"
					>
						{service.image ? "Change Photo" : "Upload Photo"}
					</label>
					<input
						id="image-upload"
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleImageChange}
					/>

					{service.image && (
						<button
							onClick={() =>
								setService((prev) => (prev ? { ...prev, image: "" } : prev))
							}
							className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex-1"
						>
							Remove
						</button>
					)}
				</div>

				{/* Allow Attach Requirements */}
				<div className="flex items-center gap-2 flex-shrink-0">
					<input
						type="checkbox"
						name="display_badge"
						checked={Boolean(service.allow_attach_file)}
						onChange={handleChange}
						className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
					/>
					<label
						htmlFor="display_badge"
						className="text-sm cursor-pointer hover:text-gray-800 transition-colors"
					>
						Allow Attach Requirements
					</label>
				</div>
			</div>

			<div className="mt-4">
				<p className="text-sm text-gray-500 whitespace-nowrap">Description:</p>
				<textarea
					name="description"
					value={service.description}
					onChange={handleChange}
					className="p-2 w-full border border-gray-300 rounded-[10px] text-sm"
					rows={16}
				/>
			</div>
		</div>
	);
};

export default EditOverview;
