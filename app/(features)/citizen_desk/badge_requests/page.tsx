"use client";

import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";

import { format } from "date-fns";
import { profiles } from "@/data/profiles";
import ProfileTag from "@/components/profile/ProfileTag";

type Profile = {
	id: string;
	name: string;
	address: string;
	image: string;
};

const BadgeRequests = () => {
	const [statuses, setStatuses] = useState<string[]>(
		profiles.map(() => "Pending")
	);
	const [dates] = useState<Date[]>(profiles.map(() => new Date()));
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	const toggleSelection = (index: number) => {
		setSelectedItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	const filteredClients = profiles
		.map((profile, index) => ({
			...profile,
			status: statuses[index],
			date: dates[index],
			index,
		}))
		.filter((profile) =>
			profile.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

	const handleSelectAll = () => {
		setSelectedItems(
			selectedItems.length === filteredClients.length
				? []
				: filteredClients.map((c) => c.index)
		);
	};

	const ActionButtons = () => (
		<>
			<Button variant="gray" size="sm">
				Reject
			</Button>
			<Button variant="secondary" size="sm">
				Accept
			</Button>
		</>
	);

	return (
		<div className="flex flex-col gap-6 p-6 bg-white rounded-[10px] pb-20">
			{/* Header */}
			<div className="flex flex-col mb-4 gap-2 mt-2">
				<div className="text-lg font-semibold">Badge Request</div>
				<div className="text-sm text-gray-600">
					Review, manage, and grant badges as requested by your citizens.
				</div>
			</div>

			{/* Services + Actions */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center w-full sm:w-[350px] px-4 border border-gray-300 bg-white rounded-lg">
					<RiSearch2Line className="text-gray-500 mr-2" />
					<input
						type="text"
						placeholder="Services a client by name"
						className="w-full focus:outline-none text-sm h-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<span className="text-sm">Selected: {selectedItems.length}</span>
					<ActionButtons />
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto rounded-lg border border-gray-200">
				<Table className="table-fixed w-full">
					<TableHeader>
						<TableRow className="bg-gray/30 border-none">
							<TableHead className="w-[40px] px-4">
								<input
									type="checkbox"
									checked={
										selectedItems.length === filteredClients.length &&
										filteredClients.length > 0
									}
									onChange={handleSelectAll}
								/>
							</TableHead>
							<TableHead className="w-[300px]">Service</TableHead>
							<TableHead className="w-[200px]">Service Attended</TableHead>
							<TableHead className="w-[120px]">Date</TableHead>
							<TableHead className="w-[170px]">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredClients.map((profile) => (
							<TableRow
								key={profile.index}
								className="hover:bg-gray-50 border-gray-200"
							>
								<TableCell className="w-[40px] px-4">
									<input
										type="checkbox"
										checked={selectedItems.includes(profile.index)}
										onChange={() => toggleSelection(profile.index)}
										className="outline-none"
									/>
								</TableCell>
								<TableCell className="w-[300px] cursor-pointer">
									<ProfileTag
										id={profile.id}
										name={profile.name}
										address={profile.address}
										image={profile.image}
									/>
								</TableCell>
								<TableCell className="w-[200px]">
									Mangrove Tree Planting
								</TableCell>
								<TableCell className="w-[120px]">
									{format(profile.date, "MMMM dd, yyyy")}
								</TableCell>
								<TableCell className="w-[170px] flex gap-2 py-12">
									<ActionButtons />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default BadgeRequests;
