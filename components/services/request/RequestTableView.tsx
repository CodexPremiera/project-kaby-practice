"use client";

import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import { MessageCircleMore as MessageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ServiceRequest } from "@/lib/clients/RequestServiceClient";
import { Service } from "@/lib/clients/ViewServiceClient";
import { getPublicUrl } from "@/utils/supabase/storage";
import { Button } from "@/components/ui/button";
import SuccessModal from "@/components/modal/SuccessModal";
import { formatDateToInputValue } from "@/lib/utils";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";

type RequestTableViewProps = {
	requests: ServiceRequest[];
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	toggleSelection: (id: string) => void;
	openRequestSheet: (request: ServiceRequest) => void;
};

const RequestTableView: React.FC<RequestTableViewProps> = ({
	requests,
	selectedItems,
	setSelectedItems,
	toggleSelection,
	openRequestSheet,
}) => {
	const router = useRouter();
	const [editableData, setEditableData] = useState<
		{ id: string; schedule_date: string; status: string }[]
	>([]);

	const [modalType, setModalType] = useState<"success" | null>(null);
	const [confirmingRequestId, setConfirmingRequestId] = useState<string | null>(
		null
	);

	useEffect(() => {
		setEditableData(
			requests.map((req) => ({
				id: req.id,
				schedule_date: formatDateToInputValue(req.schedule_date),
				status: req.status,
			}))
		);
	}, [requests]);

	const handleInputChange = (
		id: string,
		field: "schedule_date" | "status",
		value: string
	) => {
		setEditableData((prev) =>
			prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
		);
	};

	const updateRequest = async (
		id: string,
		schedule_date: string,
		status: string,
		serviceId: string
	) => {
		try {
			const response = await fetch(`/api/services/${serviceId}/request/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ schedule_date, status }),
			});

			if (!response.ok) {
				throw new Error("Failed to update request");
			}

			return await response.json();
		} catch (error) {
			console.error("Update error:", error);
			alert("Failed to update the request.");
		}
	};

	const allSelected =
		selectedItems.length === requests.length && requests.length > 0;

	return (
		<>
			<Table className="table-fixed w-full">
				<TableHeader>
					<TableRow className="border-b border-light-color text-sm">
						<TableHead className="w-[30px] pt-1 ">
							<input
								type="checkbox"
								className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
								checked={allSelected}
								onChange={() =>
									allSelected
										? setSelectedItems([])
										: setSelectedItems(requests.map((r) => r.id))
								}
							/>
						</TableHead>
						<TableHead className="w-[160px]">Customer</TableHead>
						<TableHead className="w-[80px]">Payment</TableHead>
						<TableHead className="w-[120px]">Schedule</TableHead>
						<TableHead className="w-[80px]">Status</TableHead>
						<TableHead className="w-[40px]">Chat</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{requests.map((request) => {
						const rowData = editableData.find((item) => item.id === request.id);

						const isDisabled =
							!rowData ||
							(rowData.schedule_date ===
								formatDateToInputValue(request.schedule_date) &&
								rowData.status === request.status);

						return (
							<TableRow key={request.id}>
								<TableCell>
									<input
										type="checkbox"
										className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
										checked={selectedItems.includes(request.id)}
										onChange={() => toggleSelection(request.id)}
									/>
								</TableCell>

								<TableCell className="hover:bg-gray-100">
									<button
										className="flex items-center gap-3"
										onClick={() =>
											router.push(`/profile/${request.customer_id}`)
										}
									>
										<Image
											src={
												request.customer_photo
													? getPublicUrl(
															request.customer_photo,
															"profile-pictures"
														)
													: "/default-image.jpg"
											}
											alt={`${request.customer_fname ?? "User"} image`}
											width={36}
											height={36}
											className="object-cover w-10 h-10 rounded-full"
										/>
										<div className="font-medium">
											{request.customer_fname} {request.customer_lname}
										</div>
									</button>
								</TableCell>

								<TableCell>{!request.is_paid ? "Not Paid" : "Paid"}</TableCell>

								<TableCell>
									<input
										type="date"
										value={rowData?.schedule_date || ""}
										onChange={(e) =>
											handleInputChange(
												request.id,
												"schedule_date",
												e.target.value
											)
										}
										className="border border-gray-300 rounded px-2 py-1 text-sm max-w-[80px] md:max-w-[120px] lg:max-w-[160px]"
									/>
								</TableCell>

								<TableCell>
									<span className="">{rowData?.status || ""}</span>
								</TableCell>

								<TableCell className="flex items-center gap-2">
									<ButtonClear onClick={() => openRequestSheet(request)}>
										<MessageIcon strokeWidth={2} className="w-6 p-0" />
									</ButtonClear>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

			{/* Submit Confirmation Modal */}
			{confirmingRequestId && (
				<ConfirmationModal
					title="Confirm Update"
					content="Are you sure you want to update this request?"
					onConfirm={async () => {
						const rowData = editableData.find(
							(item) => item.id === confirmingRequestId
						);
						const requestItem = requests.find(
							(r) => r.id === confirmingRequestId
						);
						if (!rowData || !requestItem) return;

						const result = await updateRequest(
							confirmingRequestId,
							rowData.schedule_date,
							rowData.status,
							requestItem.service_id
						);
						if (result) {
							setModalType("success");
							window.location.reload();
						}
						setConfirmingRequestId(null);
					}}
					onClose={() => setConfirmingRequestId(null)}
				/>
			)}

			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Request Updated"
					onClose={() => setModalType(null)}
				/>
			)}
		</>
	);
};

export default RequestTableView;
