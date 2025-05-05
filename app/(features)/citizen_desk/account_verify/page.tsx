"use client";

import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
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
import { profiles } from "@/data/profiles";
import { format } from "date-fns";

const AccountVerify = () => {
	const [statuses, setStatuses] = useState<string[]>(
		profiles.map(() => "Pending")
	);
	const [dates] = useState<Date[]>(profiles.map(() => new Date()));
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	const handleStatusChange = (index: number, newStatus: string) => {
		const updatedStatuses = [...statuses];
		updatedStatuses[index] = newStatus;
		setStatuses(updatedStatuses);
	};

	const toggleSelection = (index: number) => {
		setSelectedItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	const filteredClients = profiles
		.map((profile, index) => ({ ...profile, index }))
		.filter((profile) =>
			profile.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

	return (
		<div className="flex flex-col gap-6 p-6 pb-20 bg-white rounded-[10px]">
			{/* Header */}
			<div className="flex flex-col mb-4 gap-2 mt-2">
				<div className="text-lg font-semibold">Account Verification</div>
				<div className="text-sm">
					Review and approve newly registered citizens from Kaby.
				</div>
			</div>

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
							{["Pending", "Approved", "Rejected"].map((status) => (
								<DropdownMenuItem
									key={status}
									onClick={() => {
										const updatedStatuses = [...statuses];
										selectedItems.forEach((index) => {
											updatedStatuses[index] = status;
										});
										setStatuses(updatedStatuses);
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
						<TableRow className="bg-gray/30 border-none">
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
							<TableHead className="w-[180px]">Administrator</TableHead>
							<TableHead className="w-[230px]">Address</TableHead>
							<TableHead className="w-[150px]">Requested</TableHead>
							<TableHead className="w-[130px]">Status</TableHead>
							<TableHead className="w-[110px]">Action</TableHead>
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
								<TableCell className="w-[180px] cursor-pointer">
									{profile.name}
								</TableCell>
								<TableCell className="w-[230px]">{profile.address}</TableCell>
								<TableCell className="w-[150px]">
									{format(dates[profile.index], "MMMM dd, yyyy")}
								</TableCell>
								<TableCell className="w-[130px]">
									<select
										value={statuses[profile.index]}
										onChange={(e) =>
											handleStatusChange(profile.index, e.target.value)
										}
										className="w-full px-1 py-1 text-sm border border-gray-300 rounded-md bg-white"
									>
										<option value="Pending">Pending</option>
										<option value="Approved">Approved</option>
										<option value="Rejected">Rejected</option>
									</select>
								</TableCell>
								<TableCell className="w-[110px] flex gap-2 py-12">
									<Button variant="default" size="sm">
										Submit
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default AccountVerify;
