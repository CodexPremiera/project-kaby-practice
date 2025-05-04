"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RiSearch2Line } from "react-icons/ri";
import ProfileCard from "@/components/profile/ProfileCard";
import { profiles as profileData } from "@/data/profiles";

interface Profile {
	id: string;
	name: string;
	address: string;
	image: string;
}

const ReportedUsers = () => {
	const [open, setOpen] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
	const [statuses, setStatuses] = useState(profileData.map(() => "Pending"));
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]); // Track selected rows

	// Filtered profiles based on the search term
	const filteredProfiles = profileData.filter((profile) =>
		profile.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Handle status change for a specific profile row
	const handleStatusChange = (index: number, newStatus: string) => {
		const updatedStatuses = [...statuses];
		updatedStatuses[index] = newStatus;
		setStatuses(updatedStatuses);
	};

	// Handle batch status change for selected profiles
	const handleBatchStatusChange = (newStatus: string) => {
		const updatedStatuses = [...statuses];
		selectedItems.forEach((index) => {
			updatedStatuses[index] = newStatus;
		});
		setStatuses(updatedStatuses);
	};

	// Toggle selection for a specific row
	const toggleSelection = (index: number) => {
		setSelectedItems((prevSelectedItems) =>
			prevSelectedItems.includes(index)
				? prevSelectedItems.filter((item) => item !== index)
				: [...prevSelectedItems, index]
		);
	};

	return (
		<div className="pt-1">
			<div className="flex flex-col mb-4 gap-2 m-7">
				<div className="h5">Reported Users</div>
				<div className="text-sm">
					Review, manage and take action on citizen-submitted reports.
				</div>
			</div>
			<div className="flex flex-col sm:flex-row sm:justify-between px-10 pr-14 py-3 gap-6">
				{/* Search Input */}
				<div className="flex sm:items-center">
					<div className="flex items-center w-[350px] px-4 border border-gray-300 bg-white rounded-md">
						<RiSearch2Line className="text-gray-500 mr-2" />
						<input
							type="text"
							placeholder="Search a profile by name"
							className="w-full focus:outline-none focus:ring-0 text-[14px] h-10"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>

				{/* Status Dropdown and Submit Button */}
				<div className="flex flex-row justify-center items-center gap-4 w-full sm:w-auto">
					{/* Selected Items Count */}
					<div className="flex flex-col items-center justify-center mb-4 sm:mb-0">
						<p className="text-sm font-medium">Selected</p>
						<p className="text-xs text-secondary">
							{selectedItems.length} Item(s)
						</p>
					</div>
					{/* Status Selection for All Selected */}
					<select
						onChange={(e) => handleBatchStatusChange(e.target.value)}
						className="w-full sm:w-32 px-2 py-2 text-sm border rounded-[10px] bg-white"
					>
						<option value="">Status</option>
						<option value="Pending">Pending</option>
						<option value="Ongoing">Ongoing</option>
						<option value="Completed">Completed</option>
						<option value="Canceled">Canceled</option>
					</select>

					{/* Submit Button */}
					<Button variant="default">Submit</Button>
				</div>
			</div>

			{/* Table with horizontal scrolling */}
			<div className="w-auto p-4 bg-white rounded-lg mx-8 overflow-x-auto flex-1">
				<table className="min-w-full divide-y divide-gray-200 text-sm">
					<thead>
						<tr>
							<th className="py-2 text-left font-medium">
								<input
									type="checkbox"
									checked={selectedItems.length === filteredProfiles.length}
									onChange={() =>
										selectedItems.length === filteredProfiles.length
											? setSelectedItems([])
											: setSelectedItems(filteredProfiles.map((_, i) => i))
									}
								/>
							</th>
							<th className="py-2 px-2 text-left h6 whitespace-nowrap">
								Profile
							</th>
							<th className="py-2 px-2 text-left h6 whitespace-nowrap">
								Payment
							</th>
							<th className="py-2 px-2 text-left h6 whitespace-nowrap">
								Schedule
							</th>
							<th className="py-2 px-2 text-left h6 whitespace-nowrap">
								Status
							</th>
							<th className="py-2 px-2 text-left h6 whitespace-nowrap">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{filteredProfiles.map((profile, index) => (
							<tr key={index}>
								<td>
									<input
										type="checkbox"
										checked={selectedItems.includes(index)}
										onChange={() => toggleSelection(index)}
									/>
								</td>
								<td className="w-[350px]">
									<div
										onClick={() => {
											setSelectedProfile(profile);
											setOpen(true);
										}}
									>
										<ProfileCard
											id={profile.id}
											name={profile.name}
											address={profile.address}
											image={profile.image}
										/>
									</div>
								</td>
								<td className="px-2 whitespace-nowrap">₱1,500</td>
								<td className="px-2 whitespace-nowrap">04/25/2025</td>
								<td className="px-2">
									<select
										value={statuses[index]}
										onChange={(e) => handleStatusChange(index, e.target.value)}
										className="w-32 px-2 py-2 text-sm border rounded-[10px] bg-white"
									>
										<option value="Pending">Pending</option>
										<option value="Ongoing">Ongoing</option>
										<option value="Completed">Completed</option>
										<option value="Canceled">Canceled</option>
									</select>
								</td>
								<td className="px-2">
									<Button variant="default">Submit</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ReportedUsers;
