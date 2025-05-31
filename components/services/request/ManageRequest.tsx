"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import RequestTableView from "./RequestTableView";
import RequestSearchBar from "./RequestSearchBar";
import {
	getRequestsByService,
	Request,
} from "@/lib/clients/RequestServiceClient";
import RequestSheet from "./RequestSheet";
import RequestListView from "./RequestListView";

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

	const [requests, setRequests] = useState<Request[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [activeRequest, setActiveRequest] = useState<Request | null>(null);
	const [selectedStatus, setSelectedStatus] = useState<string>("");

	const updateSelectedStatus = () => {
		const updatedRequests = requests.map((req) =>
			selectedItems.includes(req.id) ? { ...req, status: selectedStatus } : req
		);
		setRequests(updatedRequests);
		setSelectedItems([]);
		setSelectedStatus("");
	};

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	useEffect(() => {
		const fetchRequests = async () => {
			if (!serviceId) return;
			const data = await getRequestsByService(
				serviceId,
				statusFilter === "All" ? undefined : statusFilter
			);
			setRequests(data);
		};

		fetchRequests();
	}, [serviceId, statusFilter]);

	const filteredRequests = requests.filter((req) =>
		req.service_id.toLowerCase().includes(query.toLowerCase())
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
		<div className="flex flex-col gap-8 p-4 sm:p-6 background-1 rounded-[10px]">
			{filteredRequests.length > 0 ? (
				<>
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
									className="px-3 py-2 bg-primary text-white rounded disabled:opacity-50"
								>
									Submit
								</ButtonSecondary>
							</div>
						</div>
					</div>

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
					No '{statusFilter}' service
				</div>
			)}
		</div>
	);
};

export default ManageRequest;
