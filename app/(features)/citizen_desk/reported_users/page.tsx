"use client";

import React, { useState } from "react";
import {
	RiSearch2Line,
	RiRecordCircleLine,
	RiRecordMailFill,
	RiFile2Line,
	RiFile4Fill,
	RiFile3Line,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import ProfileCard from "@/components/profile/ProfileCard";
import { profiles } from "@/data/profiles";
import { services } from "@/data/services";
import ReportSheet from "@/components/citizen_desk/ReportSheet";

type Profile = {
	id: string;
	name: string;
	address: string;
	image: string;
};

const ReportedUsers: React.FC = () => {
	const [statuses, setStatuses] = useState<string[]>(
		profiles.map(() => "Pending")
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [activeClient, setActiveClient] = useState<Profile | null>(null);

	const filteredClients = profiles
		.map((profile, index) => ({
			...profile,
			status: statuses[index],
			index,
		}))
		.filter((profile) =>
			profile.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

	const handleStatusChange = (index: number, newStatus: string) => {
		const updated = [...statuses];
		updated[index] = newStatus;
		setStatuses(updated);
	};

	const toggleSelection = (index: number) => {
		setSelectedItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	return (
		<div className="flex flex-col gap-6 p-6 bg-white rounded-[10px] pb-20">
			{/* Header */}
			<div className="flex flex-col mb-4 gap-2 mt-2">
				<div className="text-lg font-semibold">Reported Users</div>
				<div className="text-sm text-gray-600">
					Review, manage, and take action on citizen-submitted reports.
				</div>
			</div>

			{/* Search & Actions */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center w-full sm:w-[350px] px-4 border border-gray-300 bg-white rounded-lg">
					<RiSearch2Line className="text-gray-500 mr-2" />
					<input
						type="text"
						placeholder="Search a client by name"
						className="w-full focus:outline-none text-sm h-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<span className="text-sm">Selected: {selectedItems.length}</span>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="default" size="sm">
								Batch Status
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="z-10 bg-white">
							{["Pending", "Ongoing", "Completed", "Rejected"].map((status) => (
								<DropdownMenuItem
									key={status}
									onClick={() => {
										const updated = [...statuses];
										selectedItems.forEach((index) => {
											updated[index] = status;
										});
										setStatuses(updated);
									}}
								>
									{status}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<Button variant="default" size="sm">
						Submit
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto rounded-lg border border-gray-200">
				<Table className="table-fixed w-full">
					<TableHeader>
						<TableRow className=" bg-gray/30 border-none">
							<TableHead className="w-[40px] px-4">
								<input
									type="checkbox"
									checked={
										selectedItems.length === filteredClients.length &&
										filteredClients.length > 0
									}
									onChange={() =>
										selectedItems.length === filteredClients.length
											? setSelectedItems([])
											: setSelectedItems(filteredClients.map((c) => c.index))
									}
								/>
							</TableHead>
							<TableHead className="w-[300px]">Citizen</TableHead>
							<TableHead className="w-[180px]">Service</TableHead>
							<TableHead className="w-[100px]">Reports</TableHead>
							<TableHead className="w-[130px]">Status</TableHead>
							<TableHead className="w-[100px]">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredClients.map((profile) => (
							<TableRow
								key={profile.index}
								className="hover:bg-gray-50 border-gray-200"
							>
								<TableCell className="px-4">
									<input
										type="checkbox"
										checked={selectedItems.includes(profile.index)}
										onChange={() => toggleSelection(profile.index)}
									/>
								</TableCell>
								<TableCell>
									<ProfileCard
										id={profile.id}
										name={profile.name}
										address={profile.address}
										image={profile.image}
									/>
								</TableCell>
								<TableCell>{services[0].title}</TableCell>
								<TableCell>
									<Button
										variant="gray"
										size="icon"
										onClick={() => setActiveClient(profile)}
									>
										<RiFile3Line />
									</Button>
								</TableCell>
								<TableCell>
									<select
										value={statuses[profile.index]}
										onChange={(e) =>
											handleStatusChange(profile.index, e.target.value)
										}
										className="w-full px-1 py-1 text-sm border border-gray-300 rounded-md bg-white"
									>
										<option value="Pending">Pending</option>
										<option value="Ongoing">Ongoing</option>
										<option value="Completed">Completed</option>
										<option value="Rejected">Rejected</option>
									</select>
								</TableCell>
								<TableCell>
									<Button variant="default" size="sm">
										Submit
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* ReportSheet Drawer */}
			{activeClient && (
				<>
					<div
						className="fixed inset-0 bg-black/20 z-40"
						onClick={() => setActiveClient(null)}
					></div>
					<div className="fixed bottom-0 md:right-12 right-0 z-50 w-[450px] h-[500px] bg-white rounded-t-xl shadow-xl overflow-hidden flex flex-col">
						<ReportSheet
							profile={activeClient}
							onClose={() => setActiveClient(null)}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ReportedUsers;
