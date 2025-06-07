"use client";

import React, {useEffect, useState} from "react";
import TrackerSearchBar from "@/components/tracker/TrackerSearchBar";
import {useSearchParams} from "next/navigation";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import TrackerTableView from "@/components/tracker/TrackerTableView";
import {useMediaQuery} from "@/app/hooks/useMediaQuery";
import TrackerListView from "@/components/tracker/TrackerListView";
import {useCitizenContext} from "@/app/context/CitizenContext";
import {ServiceRequest} from "@/lib/clients/RequestServiceClient";
import RequestSheet from "@/components/services/request/RequestSheet";

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
	const [activeClient, setActiveClient] = useState<ServiceRequest | null>(null);

	// FETCH the requests
	const customerId = useCitizenContext().citizenId;
	const [requests, setRequests] = useState<ServiceRequest[]>([]);

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const res = await fetch(
					`/api/request/${customerId}`
				);

				if (!res.ok) {
					throw new Error('Failed to fetch your requests');
				}

				const requests = await res.clone().json();
				const { requests: customerRequests } = requests;

				setRequests(customerRequests);
			} catch (error) {
				console.error(error);
			}
		};

		fetchRequests();
	}, []);

	// SETUP selected items
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";


	const filteredRequests = requests
		.map((request, index) => {
			return {
				...request,
				index
			};
		})
		.filter((request) =>
			request.service_title.toLowerCase().includes(query.toLowerCase())
		)
		.filter((request) =>
			statusFilter === "All" ? true : request.status === statusFilter
		);

	const toggleSelection = (id: string) => {
		setSelectedItems((prev) =>
			prev.includes(id)
				? prev.filter((i) => i !== id)
				: [...prev, id]
		);
	};


	const openRequestSheet = (request: ServiceRequest) => setActiveClient(request);

	const closeRequestSheet = () => {
		setActiveClient(null);
	};

	const cancelSelected = () => {
		console.log()
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
					requests={filteredRequests}
					selectedItems={selectedItems}
					setSelectedItems={setSelectedItems}
					toggleSelection={toggleSelection}
					openRequestSheet={openRequestSheet}
				/>
			) : (
				<TrackerListView
					requests={filteredRequests}
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
						<RequestSheet request={activeClient} onClose={closeRequestSheet} />
					</div>
				</>
			)}
		</div>
	);
};

export default TrackService;
