"use client";

import { useState } from "react";
import { RiMessage2Line, RiSearch2Line } from "react-icons/ri";
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
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { profiles } from "@/data/profiles";
import RequestSheet from "./RequestSheet";
import ProfileTag from "@/components/profile/ProfileTag";

type Profile = {
	id: string;
	name: string;
	address: string;
	image: string;
};

interface ManageRequestsProps {
	statusFilter: string;
}

const ManageRequests: React.FC<ManageRequestsProps> = ({ statusFilter }) => {
	const [statuses, setStatuses] = useState<string[]>(
		profiles.map(() => "Pending")
	);
	const [dates, setDates] = useState<Date[]>(profiles.map(() => new Date()));
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	// RequestSheet state
	const [activeClient, setActiveClient] = useState<Profile | null>(null);

	const filteredClients = profiles
		.map((profile, index) => ({
			...profile,
			status: statuses[index],
			date: dates[index],
			index,
		}))
		.filter((profile) =>
			profile.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.filter((profile) =>
			statusFilter === "All" ? true : profile.status === statusFilter
		);

	const handleStatusChange = (index: number, newStatus: string) => {
		const updatedStatuses = [...statuses];
		updatedStatuses[index] = newStatus;
		setStatuses(updatedStatuses);
	};

	const handleDateChange = (index: number, newDate: Date) => {
		const updatedDates = [...dates];
		updatedDates[index] = newDate;
		setDates(updatedDates);
	};

	const toggleSelection = (index: number) => {
		setSelectedItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	const openRequestSheet = (client: Profile) => {
		setActiveClient(client);
	};

	const closeRequestSheet = () => {
		setActiveClient(null);
	};

	return (
		<div className="flex flex-col gap-6 p-6 bg-white rounded-[10px]">
			{/* Header */}
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
							{["Pending", "Ongoing", "Completed", "Canceled"].map((status) => (
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
							<TableHead className="w-[300px]">Client</TableHead>
							<TableHead className="w-[100px]">Payment</TableHead>
							<TableHead className="w-[120px]">Schedule</TableHead>
							<TableHead className="w-[130px]">Status</TableHead>
							<TableHead className="w-[150px]">Action</TableHead>
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
								<TableCell className="w-[100px]">Paid</TableCell>
								<TableCell className="w-[120px]">
									<Popover>
										<PopoverTrigger asChild>
											<Button size="sm" className="w-full">
												{format(profile.date, "MM/dd/yyyy")}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0 bg-white">
											<Calendar
												mode="single"
												selected={profile.date}
												onSelect={(date) =>
													date && handleDateChange(profile.index, date)
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
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
										<option value="Ongoing">Ongoing</option>
										<option value="Completed">Completed</option>
										<option value="Canceled">Canceled</option>
									</select>
								</TableCell>
								<TableCell className="w-[150px] flex gap-2 py-12">
									<Button variant="default" size="sm">
										Submit
									</Button>
									<Button
										variant="gray"
										size="sm"
										onClick={() => openRequestSheet(profile)}
									>
										<RiMessage2Line />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{activeClient && (
				<>
					<div className="fixed inset-0 bg-black/20 z-40"></div>
					<div className="fixed bottom-0 md:right-12 right-0 z-50 w-[450px] h-[500px] bg-white rounded-t-xl shadow-xl overflow-hidden flex flex-col">
						<RequestSheet profile={activeClient} onClose={closeRequestSheet} />
					</div>
				</>
			)}
		</div>
	);
};

export default ManageRequests;
