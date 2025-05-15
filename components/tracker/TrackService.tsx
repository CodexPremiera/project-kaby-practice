"use client";

import { useState } from "react";
import { RiMessage2Line, RiSearch2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";

import { profiles } from "@/data/profiles";
import { services } from "@/data/services";
import RequestSheet from "../services/request/RequestSheet";
import ServiceTag from "../services/ServiceTag";

type Profile = {
	id: string;
	name: string;
	address: string;
	image: string;
};

interface TrackServiceProps {
	statusFilter: string;
}

const TrackService: React.FC<TrackServiceProps> = ({ statusFilter }) => {
	const [statuses, setStatuses] = useState<string[]>(
		profiles.map(() => "Pending")
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [activeClient, setActiveClient] = useState<Profile | null>(null);

	const filteredClients = profiles
		.map((profile, index) => {
			const service = services[index % services.length];
			return {
				...profile,
				service,
				status: statuses[index],
				index,
			};
		})
		.filter((profile) =>
			profile.service.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.filter((profile) =>
			statusFilter === "All" ? true : profile.status === statusFilter
		);

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

	const cancelSelected = () => {
		const updatedStatuses = [...statuses];
		selectedItems.forEach((index) => {
			updatedStatuses[index] = "Canceled";
		});
		setStatuses(updatedStatuses);
		setSelectedItems([]);
	};

	return (
		<div className="flex flex-col gap-6 p-6 bg-white rounded-[10px]">
			{/* Header */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center w-full sm:w-[350px] px-4 border border-gray-300 bg-white rounded-lg">
					<RiSearch2Line className="text-gray-500 mr-2" />
					<input
						type="text"
						placeholder="Services a service"
						className="w-full focus:outline-none text-sm h-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<span className="text-sm">Selected: {selectedItems.length}</span>
					<Button
						variant="gray"
						size="sm"
						disabled={selectedItems.length === 0}
						onClick={cancelSelected}
					>
						Cancel Services
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
							<TableHead className="w-[300px]">Service</TableHead>
							<TableHead className="w-[150px]">Schedule</TableHead>
							<TableHead className="w-[130px]">Payment</TableHead>
							<TableHead className="w-[150px]">Message</TableHead>
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
									/>
								</TableCell>

								<TableCell className="w-[300px]">
									<ServiceTag
										id={profile.service.id}
										title={profile.service.title}
										owner={profile.service.owner}
										image={profile.service.image}
									/>
								</TableCell>

								<TableCell className="w-[150px]">April 23, 2025</TableCell>
								<TableCell className="w-[130px]">Pending</TableCell>

								<TableCell className="w-[150px] flex gap-2 py-12">
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

export default TrackService;
