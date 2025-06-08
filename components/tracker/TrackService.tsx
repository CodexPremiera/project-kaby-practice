"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import {
	getRequestsByService,
	Request,
} from "@/lib/clients/RequestServiceClient";
import SuccessModal from "@/components/modal/SuccessModal";
import TrackerSearchBar from "./TrackerSearchBar";
import TrackerTableView from "./TrackerTableView";
import RequestSheet from "../services/request/RequestSheet";
import TrackerListView from "./TrackerListView";

interface RequestServiceProps {
	statusFilter: string;
}

const TrackService: React.FC<RequestServiceProps> = ({ statusFilter }) => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	const [requests, setRequests] = useState<Request[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [activeRequest, setActiveRequest] = useState<Request | null>(null);
	const [selectedStatus, setSelectedStatus] = useState<string>("");
	const [modalType, setModalType] = useState<"success" | null>(null);

	const updateSelectedStatus = async () => {
		if (!selectedStatus || selectedItems.length === 0) return;

		try {
			const updatePromises = selectedItems.map((id) =>
				fetch(`/api/tracker`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ status: selectedStatus }),
				}).then((res) => {
					if (!res.ok) {
						throw new Error(`Failed to update request ${id}`);
					}
					return res.json();
				})
			);

			await Promise.all(updatePromises);

			const updatedRequests = requests.map((req) =>
				selectedItems.includes(req.id)
					? { ...req, status: selectedStatus }
					: req
			);

			setRequests(updatedRequests);
			setSelectedItems([]);
			setSelectedStatus("");
			setModalType("success");
			setTimeout(() => setModalType(null), 3000);
		} catch (error) {
			console.error("Batch update error:", error);
			alert("Failed to update some requests.");
		}
	};

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	const filteredRequests = requests.filter((req) =>
		req.customer_name.toLowerCase().includes(query.toLowerCase())
	);

	const toggleSelection = (id: string) => {
		setSelectedItems((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		);
	};

	const openRequestSheet = (request: Request) => {
		setActiveRequest(request);
	};

	const closeRequestSheet = () => {
		setActiveRequest(null);
	};

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
				{filteredRequests.length > 0 ? (
					<>
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
							<>
								<div className="fixed inset-0 bg-black/20 z-40"></div>
								<div className="fixed bottom-0 md:right-12 right-0 z-50 w-[450px] h-[500px] bg-white rounded-t-xl shadow-xl overflow-hidden flex flex-col">
									<RequestSheet
										profile={{
											id: activeRequest.id,
											name: activeRequest.customer_name,
											address: activeRequest.customer_address,
											image: activeRequest.customer_photo,
										}}
										onClose={closeRequestSheet}
									/>
								</div>
							</>
						)}
					</>
				) : (
					<div className="text-center text-gray-500 py-10 text-sm">
						No '{statusFilter}' requests
					</div>
				)}
			</div>

			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Requests updated successfully."
					onClose={() => setModalType(null)}
				/>
			)}
		</>
	);
};

export default TrackService;
