"use client";

import React, { useEffect, useState } from "react";
import {usePathname, useSearchParams} from "next/navigation";

import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import RequestTableView from "./RequestTableView";
import RequestSearchBar from "./RequestSearchBar";

import {
	ServiceRequest,
} from "@/lib/clients/RequestServiceClient";
import RequestSheet from "./RequestSheet";
import RequestListView from "./RequestListView";
import SuccessModal from "@/components/modal/SuccessModal";

interface RequestServiceProps {
	statusFilter: string;
	serviceId: string;
}

const ManageRequest: React.FC<RequestServiceProps> = ({
	statusFilter,
	serviceId,
}) => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	const pathname = usePathname();
	//const serviceId = pathname.split("/")[2];

	const [requests, setRequests] = useState<ServiceRequest[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [activeRequest, setActiveRequest] = useState<Request | null>(null);
	const [selectedStatus, setSelectedStatus] = useState<string>("");
	const [modalType, setModalType] = useState<"success" | null>(null);

	const updateSelectedStatus = async () => {
		if (!selectedStatus || selectedItems.length === 0) return;

		try {
			const updatePromises = selectedItems.map((id) =>
				fetch(`/api/services/${serviceId}/request/${id}`, {
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

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const res = await fetch(
					`/api/services/${serviceId}/request${statusFilter ? `?tab=${statusFilter}` : ''}`
				);

				if (!res.ok) {
					throw new Error('Failed to fetch service requests');
				}

				const { requests } = await res.json();
				setRequests(requests);
			} catch (error) {
				console.error(error);
			}
		};

		if (serviceId) {
			fetchRequests();
		}
	}, [serviceId, statusFilter]);

	const filteredRequests = requests.filter((req) =>
		req.customer_name.toLowerCase().includes(query.toLowerCase())
	);

	const toggleSelection = (id: string) => {
		setSelectedItems((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		);
	};

	const openRequestSheet = (request: ServiceRequest) => {
		setActiveRequest(request);
	};

	const closeRequestSheet = () => {
		setActiveRequest(null);
	};

	return (
		<>
			<div className="flex flex-col gap-8 p-4 background-1 rounded-[10px]">
				<div className="md:flex md:flex-row md:justify-between justify-center flex-col items-center gap-12">
					<div className="flex items-center grow max-w-[540px]">
						<RequestSearchBar />
					</div>
					<div className="flex items-center gap-3 w-full sm:w-fit pt-4">
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
							<select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
								className="border border-gray-300 rounded px-2 py-2 text-sm"
								disabled={selectedItems.length === 0}
							>
								<option value="">Select Status</option>
								<option value="Pending">Pending</option>
								<option value="Ongoing">Ongoing</option>
								<option value="Completed">Completed</option>
								<option value="Canceled">Canceled</option>
							</select>

							<ButtonSecondary
								onClick={updateSelectedStatus}
								disabled={selectedItems.length === 0 || !selectedStatus}
								className={`px-3 py-2 bg-black text-white rounded 
                ${
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

						{activeRequest && (
							<>
								<div className="fixed inset-0 bg-black/20 z-40"></div>
								<div className="fixed bottom-0 md:right-12 right-0 z-50 w-[450px] h-[500px] bg-white rounded-t-xl shadow-xl overflow-hidden flex flex-col">
									<RequestSheet
                    request={activeRequest}
										onClose={closeRequestSheet}
									/>
								</div>
							</>
						)}
					</>
				) : (
					<div className="text-center text-gray-500 py-10 text-sm">
						No '{statusFilter}' service
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

export default ManageRequest;
