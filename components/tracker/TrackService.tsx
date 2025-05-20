"use client";

import React, {useMemo, useState} from "react";
import { RiMessage2Line, RiSearch2Line } from "react-icons/ri";
import {MessageCircleMore as MessageIcon} from 'lucide-react'

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
import TrackerSearchBar from "@/components/tracker/TrackerSearchBar";
import {useRouter, useSearchParams} from "next/navigation";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import Image from "next/image";
import TrackerTableView from "@/components/tracker/TrackerTableView";
import {useMediaQuery} from "@/app/hooks/useMediaQuery";
import TrackerListView from "@/components/tracker/TrackerListView";

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
	const currentUser = "Bondy Might"; // Replace with auth logic later

	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	const [statuses, setStatuses] = useState<string[]>(
		profiles.map(() => "Pending")
	);
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
			profile.service.title.toLowerCase().includes(query.toLowerCase())
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

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	return (
		<div className="flex flex-col gap-8 p-4 sm:p-6 background-1 rounded-[10px]">
			{/* Header */}
			<div className="flex items-center justify-between gap-12">

				<div className="flex items-center grow max-w-[540px]">
					<TrackerSearchBar/>
				</div>

				<div className="flex items-center gap-3 w-fit">
					<div className="flex flex-col justify-end gap-1/2 pr-4 border-r border-secondary">
						<span className="text-sm text-secondary text-end">Selected</span>
						<span className="font-semibold text-end">{selectedItems.length} {selectedItems.length > 1 ? "items" : "item"}</span>
					</div>
					<ButtonSecondary
						disabled={selectedItems.length === 0}
						onClick={cancelSelected}>
						Cancel {selectedItems.length > 1 ? "all" : ""}
					</ButtonSecondary>
				</div>
			</div>

			{/* Table */}
			{isLargeScreen ? (
				<TrackerTableView
					filteredClients={filteredClients}
					selectedItems={selectedItems}
					setSelectedItems={setSelectedItems}
					toggleSelection={toggleSelection}
					openRequestSheet={openRequestSheet}
				/>
			) : (
				<TrackerListView
					filteredClients={filteredClients}
					selectedItems={selectedItems}
					setSelectedItems={setSelectedItems}
					toggleSelection={toggleSelection}
					openRequestSheet={openRequestSheet}
				/>
			)}

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
