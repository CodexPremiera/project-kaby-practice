"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CurrentUser, getCurrentUser } from "@/lib/clients/useAuthClient";
import Image from "next/image";
import { getPublicUrl } from "@/utils/supabase/storage";
import supabase from "@/lib/supabaseClient";
import { ServiceFormData } from "@/app/(features)/services/create/page";

type CreateOverviewProps = {
	formData: ServiceFormData;
	updateFormData: (field: keyof ServiceFormData, value: any) => void;
};

const CreateOverview: React.FC<CreateOverviewProps> = ({
	formData,
	updateFormData,
}) => {
	const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getCurrentUser();
			setCurrentUser(user);
		};
		fetchUser();
	}, []);

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

	const filteredServiceTypes = useMemo(() => {
		if (!currentUser) return [];
		return currentUser.role === "barangay"
			? ["Barangay"]
			: currentUser.role === "citizen"
				? ["Personal", "Event"]
				: [];
	}, [currentUser]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
			const isChecked = e.target.checked;
			updateFormData(name as keyof ServiceFormData, isChecked);
		} else {
			updateFormData(name as keyof ServiceFormData, value);
		}
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Generate unique file name
		const fileExt = file.name.split(".").pop();
		const fileName = `${Date.now()}.${fileExt}`;
		const filePath = `uploads/${fileName}`;

		// Upload to Supabase storage
		const { error } = await supabase.storage
			.from("services-pictures")
			.upload(filePath, file);

		if (error) {
			console.error("Upload error:", error.message);
			alert("Failed to upload image.");
			return;
		}

		// Update form data with storage path
		updateFormData("image", filePath);
	};

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
						value={formData.title}
						onChange={handleChange}
						className="font-semibold text-xl border-b border-gray-300 focus:outline-none focus:border-black flex-grow"
					/>
				</div>

				<div className="flex flex-col md:flex-row justify-between w-full">
					<div className="flex md:flex-row flex-col md:items-center md:gap-6 gap-4 pt-2">
						<div className="flex items-center gap-4 min-w-[130px]">
							<p className="text-sm text-gray-500 whitespace-nowrap">Type:</p>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="gray"
										className="min-w-[120px] justify-between"
									>
										{formData.type || "Select"}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="bg-white">
									{filteredServiceTypes.map((opt) => (
										<DropdownMenuItem
											key={opt}
											onClick={() => updateFormData("type", opt)}
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
										{formData.category || "Select"}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="bg-white">
									{serviceCategories.map((opt) => (
										<DropdownMenuItem
											key={opt}
											onClick={() => updateFormData("category", opt)}
										>
											{opt}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="flex gap-4 text-gray-600">
							{currentUser?.role === "citizen" && (
								<label className="flex items-center justify-between gap-3 text-sm cursor-pointer hover:text-gray-800 transition-colors">
									<input
										type="checkbox"
										name="display_badge"
										checked={Boolean(formData.display_badge)}
										onChange={handleChange}
										className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
									/>
									Display Badge
									<p className="text-sm text-gray-600 italic px-4">
										You currently have 0 Badges
									</p>
								</label>
							)}

							{currentUser?.role === "barangay" && (
								<label className="flex items-center gap-4 text-sm cursor-pointer hover:text-gray-800 transition-colors">
									<input
										type="checkbox"
										name="eligible_for_badges"
										checked={Boolean(formData.eligible_for_badges)}
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
					formData.image ? "" : "bg-gray-300 justify-center items-center"
				}`}
			>
				{formData.image ? (
					<Image
						src={getPublicUrl(formData.image, "services-pictures")}
						alt={`${formData.title} image`}
						fill
						className="object-cover"
					/>
				) : (
					<button className="text-gray-600 text-center m-auto select-none">
						Upload a photo
					</button>
				)}
			</div>
			<div className="mt-2 flex gap-4 items-center">
				<label
					htmlFor="image-upload"
					className="cursor-pointer px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
				>
					{formData.image ? "Change Photo" : "Upload Photo"}
				</label>
				<input
					id="image-upload"
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleImageChange}
				/>

				{formData.image && (
					<button
						onClick={() => updateFormData("image", "")}
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
					>
						Remove Photo
					</button>
				)}
			</div>
			<div className="mt-4">
				<p className="text-sm text-gray-500 whitespace-nowrap">Description:</p>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					className="p-2 w-full border border-gray-300 rounded-[10px] text-sm"
					rows={16}
				/>
			</div>
		</div>
	);
};

export default CreateOverview;
