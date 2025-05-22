"use client";

import React, {useMemo, useState} from "react";
import {profiles} from "@/data/profiles";
import {RiFile3Line, RiSearch2Line} from "react-icons/ri";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import ProfileTag from "@/components/profile/ProfileTag";
import {services} from "@/data/services";
import ReportSheet from "@/components/citizen_desk/reported_users/ReportSheet";
import ReportedUsersTable from "@/components/citizen_desk/reported_users/ReportedUsersTable";
import BadgeActions from "@/components/citizen_desk/badge_requests/BadgeActions";
import {useMediaQuery} from "@/app/hooks/useMediaQuery";
import SearchBar from "@/components/ui/form/SearchBar";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ReportedUsersList from "@/components/citizen_desk/reported_users/ReportedUsersList";

type Profile = {
	id: string;
	name: string;
	address: string;
	image: string;
};

const ReportedUsers = ()=> {
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

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	return (
		<div className="flex flex-col gap-8 p-4 sm:p-6 background-1 rounded-xl">
			{/* Header */}
			<div className="flex flex-col items-start gap-2 w-full">
				<span className="text-xl font-semibold hidden xl:block">Reported Users</span>
				<div className="text-sm text-muted-foreground">
					Review, manage, and take action on citizen-submitted reports.
				</div>
			</div>

			{/* Services & Actions */}
			<div className="flex flex-col lg:flex-row justify-between gap-4">
				<div className="flex items-center grow max-w-[540px]">
					<SearchBar
						value={searchTerm}
						placeholder="Services a client by name"
						onChange={(e) => setSearchTerm(e.target.value)}
						className="rounded-full border text-primary"
					/>
				</div>

				<div className="flex items-center gap-3 w-fit">
					<div className="flex flex-col justify-end gap-1/2 pr-4 border-r border-secondary">
						<span className="text-sm text-secondary text-end">Selected</span>
						<span
							className="font-semibold text-end">{selectedItems.length} {selectedItems.length > 1 ? "items" : "item"}</span>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="default" size="sm">
								Batch Status
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="z-10 background-1">
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
			{isLargeScreen ? (
				<ReportedUsersTable
					filteredClients={filteredClients}
					selectedItems={selectedItems}
					toggleSelection={toggleSelection}
					setActiveClient={setActiveClient}
					setSelectedItems={setSelectedItems}
					handleStatusChange={handleStatusChange}
					statuses={statuses}
				/>
			) : (
				<ReportedUsersList
					filteredClients={filteredClients}
					selectedItems={selectedItems}
					toggleSelection={toggleSelection}
					setActiveClient={setActiveClient}
					setSelectedItems={setSelectedItems}
					handleStatusChange={handleStatusChange}
					statuses={statuses}
				/>
			)}

			{/* ReportSheet Drawer */}
			{activeClient && (
				<>
					<div
						className="fixed inset-0 bg-black/20 z-40"
						onClick={() => setActiveClient(null)}
					></div>
					<div
						className="fixed bottom-0 md:right-12 right-0 z-50 w-[450px] h-[500px] bg-white rounded-t-xl shadow-xl overflow-hidden flex flex-col">
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
