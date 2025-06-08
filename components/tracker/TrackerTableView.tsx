"use client";

import React from "react";
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
import { Request } from "@/lib/clients/RequestServiceClient";
import { getPublicUrl } from "@/utils/supabase/storage";
import { Button } from "@/components/ui/button";
import SuccessModal from "@/components/modal/SuccessModal";

type TrackerTableViewProps = {
	requests: Request[];
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	toggleSelection: (id: string) => void;
	openRequestSheet: (request: Request) => void;
};

const TrackerTableView: React.FC<TrackerTableViewProps> = ({
	requests,
	selectedItems,
	setSelectedItems,
	toggleSelection,
	openRequestSheet,
}) => {
	const router = useRouter();
	const [modalType, setModalType] = React.useState<"success" | null>(null);

	const allSelected =
		requests.length > 0 && selectedItems.length === requests.length;

	// Mock cancelRequests function — replace with your actual client method
	const cancelRequests = async (ids: string[]) => {
		console.log("Canceling requests:", ids);
		// Simulate request here
		return Promise.resolve(true);
	};

	const handleBulkCancel = async () => {
		if (selectedItems.length === 0) return;
		const result = await cancelRequests(selectedItems);
		if (result) {
			setModalType("success");
			setSelectedItems([]);
			router.refresh();
		}
	};

	return (
		<>
			<div className="flex justify-end mb-4">
				<Button
					onClick={handleBulkCancel}
					disabled={selectedItems.length === 0}
					className={
						selectedItems.length === 0
							? "opacity-50 cursor-not-allowed"
							: "bg-red-600 text-white"
					}
				>
					Cancel Selected
				</Button>
			</div>

			<Table className="table-fixed w-full">
				<TableHeader>
					<TableRow className="border-b border-light-color text-sm">
						<TableHead className="w-[30px] pt-1 pb-5">
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
						<TableHead className="w-[200px]">Service</TableHead>
						<TableHead className="w-[80px]">Payment</TableHead>
						<TableHead className="w-[140px]">Schedule</TableHead>
						<TableHead className="w-[120px]">Status</TableHead>
						<TableHead className="w-[90px]">Actions</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{requests.map((request) => (
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
									onClick={() => router.push(`/profile/${request.customer_id}`)}
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
										alt={`${request.customer_name ?? "User"} image`}
										width={36}
										height={36}
										className="object-cover w-10 h-10 rounded-full"
									/>
									<div>{request.customer_name}</div>
								</button>
							</TableCell>

							<TableCell>{!request.is_paid ? "Not Paid" : "Paid"}</TableCell>

							<TableCell>{request.status}</TableCell>

							<TableCell>
								<ButtonClear onClick={() => openRequestSheet(request)}>
									<MessageIcon strokeWidth={2} className="w-6 p-0" />
								</ButtonClear>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Selected requests have been canceled."
					onClose={() => setModalType(null)}
				/>
			)}
		</>
	);
};

export default TrackerTableView;
