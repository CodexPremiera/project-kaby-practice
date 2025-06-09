"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { getPublicUrl } from "@/utils/supabase/storage";

type BadgeRequest = {
	id: string;
	service_id: string;
	service_title: string;
	service_photo: string;
	owner_name: string;
	customer_id: string;
	customer_fname: string;
	customer_lname: string;
	customer_photo: string;
	added_date: string;
	owner_id: string;
};

interface BadgeRequestsListProps {
	filteredClients: BadgeRequest[];
	selectedItems: number[];
	toggleSelection: (index: number) => void;
	handleSelectAll: () => void;
}

const BadgeRequestsList: React.FC<BadgeRequestsListProps> = ({
	filteredClients,
	selectedItems,
	toggleSelection,
	handleSelectAll,
}) => {
	return (
		<div className="w-full">
			<div className="flex w-full border-b border-light-color pb-6 gap-4 items-center">
				<input
					type="checkbox"
					className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
					checked={
						selectedItems.length === filteredClients.length &&
						filteredClients.length > 0
					}
					onChange={handleSelectAll}
				/>
				<span>Select all items</span>
			</div>

			<div className="flex flex-col">
				{filteredClients.map((profile, index) => (
					<div
						key={profile.id}
						className="flex w-full hover:bg-gray-50 border-b border-light-color py-5 justify-between"
					>
						<div className="flex w-fit gap-2 sm:gap-3">
							<div className="h-full w-fit py-3 pr-1 sm:pr-6">
								<input
									type="checkbox"
									className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
									checked={selectedItems.includes(index)}
									onChange={() => toggleSelection(index)}
								/>
							</div>

							<div className="p-1">
								<Image
									src={
										profile.customer_photo
											? getPublicUrl(profile.customer_photo, "profile-pictures")
											: "/default-image.jpg"
									}
									alt={`${profile.customer_fname ?? "User"} image`}
									width={36}
									height={36}
									className="object-cover w-10 h-10 rounded-full"
								/>
							</div>

							<div className="user_name flex flex-col justify-center items-start h-fit gap-1/2">
								<span className="text-primary font-semibold text-base sm:text-md">
									{profile.customer_fname} {profile.customer_lname}
								</span>
								<div className="flex flex-col">
									<span className="text-secondary text-sm leading-[1.4] font-medium">
										{profile.service_title}
									</span>
									<span className="text-secondary text-sm leading-[1.2] font-medium">
										{format(new Date(profile.added_date), "MMMM dd, yyyy")}
									</span>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-center h-18">
							{/* action buttons or ellipsis menu if needed */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BadgeRequestsList;
