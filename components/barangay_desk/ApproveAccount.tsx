// import React from "react";

// const ApproveAccount = () => {
// 	return <div>ApproveAccount</div>;
// };

// export default ApproveAccount;
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import App from "next/app";
// import { profiles } from "@/data/profiles";
type Appointment = {
	id: number;
	barangay_name: string;
	barangay: string;
	city: string;
	region: string;
	status: string;
	message?: string;
}
type Props = {
	appointments: Appointment[];
};


const ApproveAccount = ({appointments }:Props) => {
	const approvedApps = appointments.filter((appointment) => appointment.status === "Approved")
	console.log("these are the appointments: ", approvedApps);
	

	// console.log("this is apps:",appointments[0])
	const [statuses, setStatuses] = useState<string[]>(
		approvedApps.map((appointment) => appointment.status ||"Pending")
		// appointments.map((appointment) => appointment.status ||"Pending")
	);

	const [dates, setDates] = useState<Date[]>(approvedApps.map(() => new Date()));
	// const [dates, setDates] = useState<Date[]>(appointments.map(() => new Date()));
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	// const [messages, setMessages] = useState<string[]>(appointments.map(() => ""));
	const [messages, setMessages] = useState<string[]>(approvedApps.map(() => ""));

	// const filteredClients = appointments
	const filteredClients = approvedApps
		.map((approvedApps, index) => ({
			...approvedApps,
			status: statuses[index],
			date: dates[index],
			index,
		}))
		.filter((approvedApps) =>
			approvedApps.barangay_name.toLowerCase().includes(searchTerm.toLowerCase())
		);

	const handleStatusChange = (index: number, newStatus: string) => {
		const updatedStatuses = [...statuses];
		updatedStatuses[index] = newStatus;
		setStatuses(updatedStatuses);

	};
	// const handleSubmit = async (index: number) =>{
	// 	const appointmentId = appointments[index].id;
	// 	const updatedStatus = statuses[index]

	// 	console.log("Appointment id: ", appointmentId ," and new status: ", updatedStatus)

	// 	try{
	// 		const res = await fetch("/api/admin/appointment",{
	// 			method: 'PUT',
	// 			headers: {"Content-Type": "application/json"},
	// 			body: JSON.stringify({id:appointmentId, status:updatedStatus})
	// 		});
	// 	} catch (err) {
	// 		console.error("error ", err);
	// 	}
	// }
	const handleMessageChange = (index: number, value: string) => {
		const updatedMessages = [...messages];
		updatedMessages[index] = value;
		setMessages(updatedMessages);
	};

	const toggleSelection = (index: number) => {
		setSelectedItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	return (
		<div className="flex flex-col gap-6 p-6 bg-white rounded-[10px] mt-4">
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
							<TableHead className="w-[100px]">Barangay</TableHead>
							<TableHead className="w-[100px]">City</TableHead>
							<TableHead className="w-[100px]">Region</TableHead>
							<TableHead className="w-[50px]">Message</TableHead>
							<TableHead className="w-[50px]">Status</TableHead>
							{/* <TableHead className="w-[50px]">Action</TableHead> */}
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredClients.map((appointments) => (
							<TableRow
								key={appointments.index}
								className="hover:bg-gray-50 border-gray-200"
							>
								<TableCell className="w-[40px] px-4">
									<input
										type="checkbox"
										checked={selectedItems.includes(appointments.index)}
										onChange={() => toggleSelection(appointments.index)}
										className="outline-none"
									/>
								</TableCell>
								<TableCell className="w-[100px]">{appointments.barangay_name}</TableCell>
								<TableCell className="w-[100px]">{appointments.city}</TableCell>
								<TableCell className="w-[100px]">{appointments.region}</TableCell>
								<TableCell className="w-[50px]">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="gray"
												size="icon"
												className="rounded-full"
											>
												<RiMessage2Line className="text-gray-600" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-64 p-4 bg-white shadow-md rounded-lg">
											<p className="text-sm text-gray-700 mb-2">
												Message from {appointments.barangay_name}
											</p>
											<div className="border border-gray-300 rounded-md p-2 text-sm text-gray-800 bg-gray-50">
												{/* {messages[appointments.index] || "No message received."} */}
												{appointments.message || "No message received."}

											</div>
										</PopoverContent>
									</Popover>
								</TableCell>
								{/* <TableCell className="w-[50px]"> */}
									{/* <select
										value={appointments.status}
										onChange={(e) =>
											handleStatusChange(appointments.index, e.target.value)
										}
										className="w-full px-1 py-1 text-sm border border-gray-300 rounded-md bg-white"
									>
										<option value="Pending">Pending</option>
										<option value="Approved">Approved</option>
										<option value="Rejected">Rejected</option>
									</select> */}

								{/* </TableCell> */}
								<TableCell className="w-[100px]">{appointments.status}</TableCell>

								{/* <TableCell className="w-[50px] flex gap-2 py-12">
									<Button variant="default" size="sm" onClick={() => handleSubmit(appointments.index)}>
										Submit
									</Button>
								</TableCell> */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ApproveAccount;

