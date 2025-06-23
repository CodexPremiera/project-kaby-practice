"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

// UI Components
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import RequestTableView from "./RequestTableView";
import RequestListView from "./RequestListView";
import RequestSearchBar from "./RequestSearchBar";
import RequestSheet from "./RequestSheet";
import SuccessModal from "@/components/modal/SuccessModal";

// Types
import { ServiceRequest } from "@/lib/clients/RequestServiceClient";
import ConfirmationModal from "@/components/modal/ConfirmationModal";

interface RequestServiceProps {
	statusFilter: string;
	serviceId: string;
	initializedRequests: ServiceRequest[];
}

const ManageRequest: React.FC<RequestServiceProps> = ({
	statusFilter,
	serviceId,
	initializedRequests,
}) => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q")?.toLowerCase() || "";

	const [requests, setRequests] = useState<ServiceRequest[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(
		null
	);
	const [selectedStatus, setSelectedStatus] = useState<string>("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [modalType, setModalType] = useState<"success" | null>(null);

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	// Sync local requests when initializedRequests changes (tab changes)
	useEffect(() => {
		setRequests(initializedRequests);
		setSelectedItems([]);
		setSelectedStatus("");
	}, [initializedRequests]);

	// Filter requests by search query on last name
	const filteredRequests = requests.filter((req) =>
		(req.customer_lname || "").toLowerCase().includes(query)
	);

	const toggleSelection = (id: string) => {
		setSelectedItems((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		);
	};

	const openRequestSheet = (request: ServiceRequest) =>
		setActiveRequest(request);
	const closeRequestSheet = () => setActiveRequest(null);

	const updateSelectedStatus = async () => {
		if (!selectedStatus || selectedItems.length === 0) return;

		try {
			const updateRequests = selectedItems.map((id) =>
				fetch(`/api/services/${serviceId}/request/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ status: selectedStatus }),
				}).then((res) => {
					if (!res.ok) throw new Error(`Failed to update request ${id}`);
					return res.json();
				})
			);

			await Promise.all(updateRequests);

			setRequests((prev) =>
				prev.map((req) =>
					selectedItems.includes(req.id)
						? { ...req, status: selectedStatus }
						: req
				)
			);

			setSelectedItems([]);
			setSelectedStatus("");
			setModalType("success");

			setTimeout(() => {
				setModalType(null);
				window.location.reload();
			}, 3000);
		} catch (error) {
			console.error("Batch update error:", error);
			alert("Failed to update some requests.");
		}
	};

	return (
		<>
			<div className="flex flex-col gap-8 p-4 background-1 rounded-[10px]">
				{/* Top Bar: Search + Bulk Actions */}
				<div className="md:flex md:justify-between flex-col md:flex-row items-center gap-12">
					<div className="max-w-[540px] w-full">
						<RequestSearchBar />
					</div>

					{/* Bulk Status Update Controls */}
					<div className="flex items-center gap-3 w-full sm:w-fit">
						<div className="flex flex-col justify-end gap-1 pr-4 border-r border-secondary text-end">
							<span className="text-xs sm:text-sm text-secondary">
								Selected
							</span>
							<span className="font-semibold text-sm sm:text-base">
								{selectedItems.length}{" "}
								{selectedItems.length === 1 ? "item" : "items"}
							</span>
						</div>

						<div className="flex items-center gap-2">
							<select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
								disabled={selectedItems.length === 0}
								className="border border-gray-300 rounded px-2 py-2 text-sm"
							>
								<option value="">Select Status</option>
								<option value="Pending">Pending</option>
								<option value="Ongoing">Ongoing</option>
								<option value="Completed">Completed</option>
								<option value="Canceled">Canceled</option>
							</select>

							<ButtonSecondary
								onClick={() => setShowConfirmModal(true)}
								disabled={selectedItems.length === 0 || !selectedStatus}
								className={`px-3 py-2 bg-black text-white rounded ${
									selectedItems.length === 0 || !selectedStatus
										? "opacity-50 pointer-events-none"
										: ""
								}`}
							>
								Submit
							</ButtonSecondary>
						</div>
					</div>
				</div>

				{/* Requests List */}
				{filteredRequests.length > 0 ? (
					<>
						{isLargeScreen ? (
							<RequestTableView
								requests={filteredRequests}
								selectedItems={selectedItems}
								setSelectedItems={setSelectedItems}
								toggleSelection={toggleSelection}
								openRequestSheet={openRequestSheet}
							/>
						) : (
							<RequestListView
								requests={filteredRequests}
								selectedItems={selectedItems}
								setSelectedItems={setSelectedItems}
								toggleSelection={toggleSelection}
								openRequestSheet={openRequestSheet}
							/>
						)}

						{/* Slide-up Detail Sheet */}
						{activeRequest && (
							<RequestSheet
								request={activeRequest}
								onClose={closeRequestSheet}
							/>
						)}
					</>
				) : (
					<div className="text-center text-gray-500 py-10 text-sm">
						No '{statusFilter}' service
					</div>
				)}
			</div>

			{/* Success Modal */}
			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Requests updated successfully."
					onClose={() => setModalType(null)}
				/>
			)}
			{/* Confirmation Modal */}
			{showConfirmModal && (
				<ConfirmationModal
					title="Confirm Status Update"
					content={`Are you sure you want to update the status of ${selectedItems.length} ${selectedItems.length === 1 ? "request" : "requests"} to "${selectedStatus}"?`}
					onConfirm={() => {
						setShowConfirmModal(false);
						updateSelectedStatus();
					}}
					onClose={() => setShowConfirmModal(false)}
				/>
			)}
		</>
	);
};

export default ManageRequest;
