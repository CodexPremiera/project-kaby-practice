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
import { Request } from "@/lib/clients/RequestServiceClient";
import { getPublicUrl } from "@/utils/supabase/storage";
import { Button } from "@/components/ui/button";

// Helper to format Date to "YYYY-MM-DD"
function formatDateToInputValue(date: string | Date | undefined): string {
	if (!date) return "";
	if (typeof date === "string") {
		return date.slice(0, 10);
	}
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}

type RequestTableViewProps = {
	requests: Request[];
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	toggleSelection: (id: string) => void;
	openRequestSheet: (request: Request) => void;
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

	const allSelected =
		selectedItems.length === requests.length && requests.length > 0;
	return (
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
					<TableHead className="w-[200px]">Customer</TableHead>
					<TableHead className="w-[80px]">Payment</TableHead>
					<TableHead className="w-[140px]">Schedule</TableHead>
					<TableHead className="w-[120px]">Status</TableHead>
					<TableHead className="w-[90px]">Actions</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{requests.map((request) => {
					const rowData = editableData.find((item) => item.id === request.id);

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

							<TableCell>Not Paid</TableCell>

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
									className="border rounded px-2 py-1 text-sm"
								/>
							</TableCell>

							<TableCell>
								<select
									value={rowData?.status || ""}
									onChange={(e) =>
										handleInputChange(request.id, "status", e.target.value)
									}
									className="border rounded px-2 py-1 text-sm"
								>
									<option value="Pending">Pending</option>
									<option value="Ongoing">Ongoing</option>
									<option value="Completed">Completed</option>
									<option value="Canceled">Canceled</option>
								</select>
							</TableCell>

							<TableCell className="flex items-center gap-2">
								<ButtonClear onClick={() => openRequestSheet(request)}>
									<MessageIcon strokeWidth={2} className="w-6 p-0" />
								</ButtonClear>
								<Button>Submit</Button>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default RequestTableView;
