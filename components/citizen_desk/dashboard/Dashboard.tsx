"use client";

import React, {useMemo, useState} from "react";
import {AgePopulation} from "@/components/ui/charts/AgePopulation";
import {SectorPopulation} from "@/components/ui/charts/SectorPopulation";
import CitizensTable from "@/components/citizen_desk/dashboard/CitizensTable";
import {profiles} from "@/data/profiles";
import {useMediaQuery} from "@/app/hooks/useMediaQuery";
import BadgeActions from "@/components/citizen_desk/badge_requests/BadgeActions";
import SearchBar from "@/components/ui/form/SearchBar";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";

const Dashboard = ()=> {
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
		<div className="flex flex-col gap-8 p-4 sm:p-6 background-1 rounded-[10px]">
			<div className="flex w-full flex-col lg:flex-row gap-8">
				<div className="lg:w-[50%]">
					<AgePopulation/>
				</div>
				<div className="lg:w-[50%]">
					<SectorPopulation/>
				</div>
			</div>

			<div className="flex flex-col gap-8 w-full">
				{/* Services + Actions */}
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center grow max-w-[540px]">
						<SearchBar
							value={searchTerm}
							placeholder="Services a citizen by name"
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
								Remove
							</ButtonSecondary>
						</div>
					</div>
				</div>

				{isLargeScreen ? (
					<CitizensTable
						filteredClients={filteredClients}
						selectedItems={selectedItems}
						toggleSelection={toggleSelection}
						handleSelectAll={handleSelectAll}
						actionButtons={<BadgeActions/>}
					/>
				) : (
					<CitizensTable
						filteredClients={filteredClients}
						selectedItems={selectedItems}
						toggleSelection={toggleSelection}
						handleSelectAll={handleSelectAll}
						actionButtons={<BadgeActions/>}
					/>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
