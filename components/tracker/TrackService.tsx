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

interface RequestServiceProps {
	statusFilter: string;
}

const TrackService: React.FC<TrackServiceProps> = ({ statusFilter }) => {
	const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(null);

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


	const openRequestSheet = (request: ServiceRequest) => setActiveRequest(request);

	const closeRequestSheet = () => {
		setActiveRequest(null);
	};

	const cancelSelected = () => {
		console.log()
	};

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	return (
		<>
			<div className="flex flex-col gap-8 p-4 background-1 rounded-[10px]">
				<div className="md:flex md:flex-row md:justify-between justify-center flex-col items-center gap-12">
					<div className="flex flex-col mb-4 gap-2">
						<h1 className="text-lg font-semibold">Your Tracker</h1>
						<p className="text-sm">Track your Service Request here.</p>
					</div>
					<div className="flex items-center grow max-w-[540px]">
						<TrackerSearchBar />
					</div>
					<div className="flex items-center gap-3 w-full sm:w-fit sm:pt-0 pt-4">
						<div className="flex flex-col justify-end gap-1 pr-4 border-r border-secondary">
							<span className="text-xs sm:text-sm text-secondary text-end">
								Selected
							</span>
							<span className="font-semibold text-end text-sm sm:text-base">
								{selectedItems.length}{" "}
								{selectedItems.length > 1 ? "items" : "item"}
							</span>
						</div>

						<div className="flex items-center gap-2">
							<ButtonSecondary>Cancel</ButtonSecondary>
						</div>
					</div>
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

			{activeRequest && (
				<RequestSheet request={activeRequest} onClose={closeRequestSheet} />
			)}
		</div>
	);
};

export default TrackService;
