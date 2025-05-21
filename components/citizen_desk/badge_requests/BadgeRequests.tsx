"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import {profiles} from "@/data/profiles";
import {RiSearch2Line} from "react-icons/ri";
import {useMediaQuery} from "@/app/hooks/useMediaQuery";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import BadgeRequestsTable from "@/components/citizen_desk/badge_requests/BadgeRequestsTable";
import BadgeActions from "@/components/citizen_desk/badge_requests/BadgeActions";
import SearchBar from "@/components/ui/form/SearchBar";
import BadgeRequestsList from "@/components/citizen_desk/badge_requests/BadgeRequestsList";

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


	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	return (
		<div className="flex flex-col gap-8 p-4 background-1 rounded-xl">
			{/* Header */}
			<div className="flex flex-col items-start gap-2 w-full">
				<span className="text-xl font-semibold hidden xl:block">Badge Request</span>
				<div className="text-sm text-muted-foreground">
					Review, manage, and grant badges as requested by your citizens.
				</div>
			</div>

			{/* Services + Actions */}
			<div className="flex items-center justify-between gap-4">
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
					<div className="flex gap-2 py-4 rounded-xl z-50">
						<ButtonSecondary
							onClick={() => {
								// handle rejection logic here
								// setShowActions(false);
							}}
							className="!p-3 !text-sm">
							Reject
						</ButtonSecondary>
						<ButtonPrimary
							onClick={() => {
								// handle approval logic here
								// setShowActions(false);
							}}
							className="!p-3 !text-sm">
							Accept
						</ButtonPrimary>
					</div>
				</div>
			</div>

			{/* Table */}


			{isLargeScreen ? (
				<BadgeRequestsTable
					filteredClients={filteredClients}
					selectedItems={selectedItems}
					toggleSelection={toggleSelection}
					handleSelectAll={handleSelectAll}
					actionButtons={<BadgeActions/>}
				/>
			) : (
				<BadgeRequestsList
					filteredClients={filteredClients}
					selectedItems={selectedItems}
					toggleSelection={toggleSelection}
					handleSelectAll={handleSelectAll}
					actionButtons={<BadgeActions/>}
				/>
			)}
		</div>
	);
};

export default BadgeRequests;
