"use client";

import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { getPublicUrl } from "@/utils/supabase/storage";
import BadgeActions from "./BadgeActions";

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

type Props = {
	filteredClients: BadgeRequest[];
	selectedItems: number[];
	toggleSelection: (index: number) => void;
	handleSelectAll: () => void;
	onActionComplete: () => void;
};

function BadgeRequestsTable({
	filteredClients,
	selectedItems,
	toggleSelection,
	handleSelectAll,
	onActionComplete,
}: Props) {
	const router = useRouter();

	return (
		<Table className="table-fixed w-full">
			<TableHeader>
				<TableRow className="border-b border-light-color text-sm">
					<TableHead className="w-[20px] pt-1 pb-5">
						<input
							type="checkbox"
							className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
							checked={
								selectedItems.length === filteredClients.length &&
								filteredClients.length > 0
							}
							onChange={handleSelectAll}
						/>
					</TableHead>
					<TableHead className="w-[180px] text-secondary text-sm pt-1 pb-5">
						Customer
					</TableHead>
					<TableHead className="w-[180px] text-secondary text-sm pt-1 pb-5">
						Service Availed
					</TableHead>
					<TableHead className="w-[80px] text-secondary text-sm pt-1 pb-5">
						Date
					</TableHead>
					<TableHead className="w-[24px] text-secondary text-sm pt-1 pb-5" />
				</TableRow>
			</TableHeader>

			<TableBody>
				{filteredClients.map((profile, index) => (
					<TableRow
						key={profile.id}
						className="overflow-hidden hover:bg-gray-50 border-light-color h-18"
					>
						<TableCell>
							<input
								type="checkbox"
								className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
								checked={selectedItems.includes(index)}
								onChange={() => toggleSelection(index)}
							/>
						</TableCell>

						{/* Customer */}
						<TableCell>
							<button
								className="flex items-center gap-3 w-[18.75rem]"
								onClick={() => router.push(`/profile/${profile.customer_id}`)}
							>
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

								<div className="flex flex-col justify-center items-start p-1 h-9">
									<div className="text-primary font-semibold text-md">
										{profile.customer_fname} {profile.customer_lname}
									</div>
								</div>
							</button>
						</TableCell>

						{/* Service */}
						<TableCell>
							<div className="flex flex-col">
								<span className="font-medium">{profile.service_title}</span>
								<span className="text-secondary text-xs">
									{profile.owner_name}
								</span>
							</div>
						</TableCell>

						{/* Date */}
						<TableCell>
							{format(new Date(profile.added_date), "MMMM dd, yyyy")}
						</TableCell>

						{/* Actions */}
						<TableCell className="flex items-center justify-center h-18">
							<BadgeActions
								customer_id={profile.customer_id}
								owner_id={profile.owner_id}
								service_id={profile.service_id}
								onActionComplete={onActionComplete}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default BadgeRequestsTable;
