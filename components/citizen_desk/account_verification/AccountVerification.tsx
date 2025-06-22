"use client";

import React, {useEffect, useMemo, useState} from "react";
import {useBarangayContext} from "@/app/context/BarangayContext";
import {createClient} from "@/utils/supabase/client";
import TemporaryAccountService from "@/services/TemporaryAccountService";
import {RiSearch2Line} from "react-icons/ri";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {format} from "date-fns";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";

interface Profile {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	barangay: string;
	created_at: string;
	status: string;
	[key: string]: any;
}

const AccountVerification = ()=> {

	// ==============
	
	const {barangayName,barangayAddress} = useBarangayContext();
	console.log("this is brf=gy name:" , barangayName);
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [modalType, setModalType] = useState<null | "success" | "error">(null);
	const [successMessage, setSuccessMessage] = useState("");
	useEffect(() => {
		if (!barangayName) return;
		const fetchData = async () => {
			const supabase = createClient();
			const tempService = new TemporaryAccountService(supabase);
			const result: Profile[] = await tempService.getAllByBarangay(barangayName);
			const pendingPro = result.filter((result) => result.status === "Pending");
			console.log("pending pro", pendingPro);

			console.log(result, "this result");
			setProfiles(pendingPro);


		};

		fetchData();
	}, [barangayName]);

	const handleSubmit = async (index: number) => {
		const profileId = profiles[index].id;
		const updatedStatus = statuses[index];
		

		const email = profiles[index].email;
		console.log("Emailzzz: ", email)
		console.log("Appointment id: ", profileId ," and new status: ", updatedStatus)

		try {
			const res = await fetch("/api/features/citizen_desk", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: profileId, status: updatedStatus }),
			});
			if(!res.ok){
				alert(res)
				throw new Error("Failed to update appointment status")
			}
			setSuccessMessage("Successfully verified a citizen.");
      		setModalType("success");


		} catch (err) {
			console.error("error ", err);
		}
	};
	const handleCloseModal = () => {
    setModalType(null);
    // onClose();
  };
	const [statuses, setStatuses] = useState<string[]>(
		profiles.map(() => "Pending")
	);
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
			`${profile.first_name} ${profile.last_name}`
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		);

	return (
		<div className="flex flex-col gap-6 p-6 pb-20 rounded-xl">
			{modalType === "success" && (
        <SuccessModal
          title="Success"
          content={successMessage}
          onClose={handleCloseModal}
        />
      )}
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
							<TableHead className="w-[230px]">Email</TableHead>
							{/* <TableHead className="w-[230px]">Barangay</TableHead> */}
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
									{profile.first_name} {profile.last_name}
								</TableCell>
								<TableCell className="w-[230px]">{profile.email}</TableCell>
								{/* <TableCell className="w-[230px]">{profile.barangay}</TableCell> */}
								<TableCell className="w-[150px]">
									{/* {format(dates[profile.index], "MMMM dd, yyyy")} */}
									{format(new Date(profile.created_at), "MMMM dd, yyyy")}
								</TableCell>
								<TableCell className="w-[130px]">
									<select
										// value={profile.status}
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
									<Button variant="default" size="sm" onClick={() => handleSubmit(profile.index)}>
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
	// ==============
};

export default AccountVerification;
