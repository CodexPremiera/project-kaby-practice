"use client";

import React, { useEffect, useState } from "react";
import TrackerSearchBar from "@/components/tracker/TrackerSearchBar";
import { useSearchParams } from "next/navigation";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import TrackerTableView from "@/components/tracker/TrackerTableView";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import TrackerListView from "@/components/tracker/TrackerListView";
import { useCitizenContext } from "@/app/context/CitizenContext";
import { ServiceRequest } from "@/lib/clients/RequestServiceClient";
import RequestSheet from "@/components/services/request/RequestSheet";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import { getServiceById } from "@/lib/clients/ViewServiceClient";

interface RequestServiceProps {
	statusFilter: string;
	onCountChange: (count: number) => void;
	initialRequests?: ServiceRequest[];
}

interface ServiceFees {
	service_cost: number;
	agreement_fee: number;
}

const TrackService: React.FC<RequestServiceProps> = ({
	statusFilter,
	onCountChange,
	initialRequests = [],
}) => {
	const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(
		null
	);
	const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [modalType, setModalType] = useState<"success" | "error" | null>(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [serviceFees, setServiceFees] = useState<{
		[serviceId: string]: ServiceFees;
	}>({});

	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";
	const customerId = useCitizenContext().citizenId;

	const fetchServiceFees = async (serviceId: string) => {
		if (serviceFees[serviceId] !== undefined) return;

		const service = await getServiceById(serviceId);
		if (service) {
			setServiceFees((prev) => ({
				...prev,
				[serviceId]: {
					service_cost: service.service_cost,
					agreement_fee: service.agreement_fee,
				},
			}));
		}
	};

	// Sync requests and notify parent of count whenever initialRequests changes
	useEffect(() => {
		setRequests(initialRequests);
		onCountChange(initialRequests.length);
	}, [initialRequests, onCountChange]);

	// filteredRequests based on search query only,
	// status filtering is done in parent
	const filteredRequests = requests
		.map((request, index) => ({ ...request, index }))
		.filter((request) =>
			request.service_title.toLowerCase().includes(query.toLowerCase())
		);

	useEffect(() => {
		filteredRequests.forEach((req) => {
			fetchServiceFees(req.service_id);
		});
	}, [filteredRequests]);

	const toggleSelection = (id: string) => {
		setSelectedItems((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		);
	};

	const openRequestSheet = (request: ServiceRequest) =>
		setActiveRequest(request);
	const closeRequestSheet = () => setActiveRequest(null);

	const cancelSelected = async () => {
		if (selectedItems.length === 0) return;
		try {
			const res = await fetch(`/api/tracker/${customerId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids: selectedItems }),
			});
			if (!res.ok) throw new Error("Failed to cancel selected requests");

			setSelectedItems([]);
			setModalType("success");
			setTimeout(() => {
				setModalType(null);
				window.location.reload();
			}, 2000);
		} catch (error) {
			console.error(error);
			setModalType("error");
		}
	};

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	const closeModal = () => {
		setModalType(null);
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
						<ButtonSecondary
							onClick={() => setShowConfirmModal(true)}
							disabled={selectedItems.length === 0}
						>
							Cancel
						</ButtonSecondary>
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
							serviceFees={serviceFees}
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
				</>
			) : (
				<div className="text-center text-gray-500 py-10 text-sm">
					No '{statusFilter}' requests
				</div>
			)}

			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Selected requests canceled successfully."
					onClose={closeModal}
				/>
			)}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content="Something went wrong while canceling."
					onClose={closeModal}
				/>
			)}
			{showConfirmModal && (
				<ConfirmationModal
					title="Confirm Cancel"
					content="Are you sure you want to cancel? This action cannot be undone."
					onConfirm={() => {
						setShowConfirmModal(false);
						cancelSelected();
					}}
					onClose={() => setShowConfirmModal(false)}
				/>
			)}
		</>
	);
};

export default TrackService;
