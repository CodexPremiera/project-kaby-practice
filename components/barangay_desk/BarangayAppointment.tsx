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
import CreateAccount from "./CreateAccount";

type Appointment = {
	id: number;
	barangay_name: string;
	barangay: string;
	email: string;
	city: string;
	region: string;
	status: string;
	message?: string;
};

type Props = {
	appointments: Appointment[];
};

// const BarangayAppointment = ({ appointments }: Props) => {
	
const BarangayAppointment = ({ appointments }: Props) => {
	
	const [showCreateAccount, setShowCreateAccount] = useState(false);
	const pendingApps = appointments.filter((appointment) => appointment.status === "Pending");
	console.log("these are the appointments: ", pendingApps);

	const [statuses, setStatuses] = useState<string[]>(
		pendingApps.map((appointment) => appointment.status ||"Pending")
	);

	const [dates, setDates] = useState<Date[]>(pendingApps.map(() => new Date()));
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [messages, setMessages] = useState<string[]>(pendingApps.map(() => ""));

	const filteredClients = pendingApps
		.map((pendingApps, index) => ({
			...pendingApps,
			status: statuses[index],
			date: dates[index],
			index,
		}))
		.filter((pendingApps) =>
			pendingApps.barangay_name.toLowerCase().includes(searchTerm.toLowerCase())
		);

	const handleStatusChange = (index: number, newStatus: string) => {
		const updatedStatuses = [...statuses];
		updatedStatuses[index] = newStatus;
		setStatuses(updatedStatuses);
	};

	const handleSubmit = async (index: number) => {
		const appointmentId = pendingApps[index].id;
		const updatedStatus = statuses[index];

		const email = pendingApps[index].email;
		console.log("Emailzzz: ", email)
		console.log("Appointment id: ", appointmentId ," and new status: ", updatedStatus)

		try {
			const res = await fetch("/api/admin/appointment", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: appointmentId, status: updatedStatus }),
			});
			if(!res.ok){
				throw new Error("Failed to update appointment status")
			}
			if(updatedStatus === "Approved"){
				
				// const registerBrgy = await fetch("/api/admin/appointment",{
				// 	method: 'POST',
				// 	headers: {"Content-Type": "application/json"},
				// 	body: JSON.stringify({
				// 		email:email, 
				// 		password:email
				// 	})
				// });
			}

			if (updatedStatus === "Approved") {
				setShowCreateAccount(true);
			} else {
				setShowCreateAccount(false);
			}
		} catch (err) {
			console.error("error ", err);
		}
	};

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
						placeholder="Services a client by name"
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
					<Button
						variant="outline"
						className="w-full sm:w-auto border border-gray-200"
						onClick={() => setShowCreateAccount(true)}
					>
						+ Create Account
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
							<TableHead className="w-[100px]">Barangay</TableHead>
							<TableHead className="w-[100px]">City</TableHead>
							<TableHead className="w-[100px]">Region</TableHead>
							<TableHead className="w-[50px]">Message</TableHead>
							<TableHead className="w-[50px]">Status</TableHead>
							<TableHead className="w-[50px]">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredClients.map((appointment) => (
							<TableRow
								key={appointment.index}
								className="hover:bg-gray-50 border-gray-200"
							>
								<TableCell className="w-[40px] px-4">
									<input
										type="checkbox"
										checked={selectedItems.includes(appointment.index)}
										onChange={() => toggleSelection(appointment.index)}
										className="outline-none"
									/>
								</TableCell>
								<TableCell className="w-[100px]">
									{appointment.barangay_name}
								</TableCell>
								<TableCell className="w-[100px]">{appointment.city}</TableCell>
								<TableCell className="w-[100px]">
									{appointment.region}
								</TableCell>
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
												Message from {appointment.barangay_name}
											</p>
											<div className="border border-gray-300 rounded-md p-2 text-sm text-gray-800 bg-gray-50">
												{appointment.message || "No message received."}
											</div>
										</PopoverContent>
									</Popover>
								</TableCell>
								<TableCell className="w-[50px]">
									<select
										value={appointment.status}
										onChange={(e) =>
											handleStatusChange(appointment.index, e.target.value)
										}
										className="w-full px-1 py-1 text-sm border border-gray-300 rounded-md bg-white"
									>
										<option value="Pending">Pending</option>
										<option value="Approved">Approved</option>
										<option value="Rejected">Rejected</option>
									</select>
								</TableCell>
								<TableCell className="w-[50px] flex gap-2 py-12">
									<Button
										variant="default"
										size="sm"
										onClick={() => handleSubmit(appointment.index)}
									>
										Submit
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Modal */}
			{showCreateAccount && (
				<CreateAccount onClose={() => setShowCreateAccount(false)} />
			)}
		</div>
	);
};

export default BarangayAppointment;
