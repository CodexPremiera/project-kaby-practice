"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import RequestTableView from "./RequestTableView";
import RequestSearchBar from "./RequestSearchBar";
import { RiEditBoxLine, RiStarFill, RiUser2Fill } from "react-icons/ri";
import { router } from "next/client";
import {
	getRequestsByService,
	Request,
} from "@/lib/clients/RequestServiceClient";
import RequestSheet from "./RequestSheet";
import RequestListView from "./RequestListView";

interface RequestServiceProps {
	statusFilter: string;
}

const ManageRequest: React.FC<RequestServiceProps> = ({ statusFilter }) => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	const pathname = usePathname();
	const serviceId = pathname.split("/")[2];

	const [requests, setRequests] = useState<Request[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [activeRequest, setActiveRequest] = useState<Request | null>(null);

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

	const cancelSelected = () => {
		const updatedRequests = requests.map((req) =>
			selectedItems.includes(req.id) ? { ...req, status: "Canceled" } : req
		);
		setRequests(updatedRequests);
		setSelectedItems([]);
	};

	return (
		<div className="flex flex-col gap-8 p-4 sm:p-6 background-1 rounded-[10px]">
			<div className="flex flex-row justify-between items-center border-b pb-4 border-gray-200 text-md font-semibold">
				<div>Service Requests</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1">
						<span>0</span>
						<RiStarFill className="text-secondary" />
					</div>
					<div className="flex items-center gap-1">
						<span>0</span>
						<RiUser2Fill className="text-secondary" />
					</div>
					<div>
						<RiEditBoxLine
							onClick={() => router.push(`/services/${serviceId}/edit`)}
							size={22}
							className="hover:bg-white rounded-full cursor-pointer"
						/>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between gap-12">
				<div className="flex items-center grow max-w-[540px]">
					<RequestSearchBar />
				</div>

				<div className="flex items-center gap-3 w-fit">
					<div className="flex flex-col justify-end gap-1/2 pr-4 border-r border-secondary">
						<span className="text-sm text-secondary text-end">Selected</span>
						<span className="font-semibold text-end">
							{selectedItems.length}{" "}
							{selectedItems.length > 1 ? "items" : "item"}
						</span>
					</div>
					<ButtonSecondary
						disabled={selectedItems.length === 0}
						onClick={cancelSelected}
					>
						Cancel {selectedItems.length > 1 ? "all" : ""}
					</ButtonSecondary>
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
								name: activeRequest.owner,
								address: activeRequest.owner,
								image: activeRequest.owner,
							}}
							onClose={closeRequestSheet}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ManageRequest;
