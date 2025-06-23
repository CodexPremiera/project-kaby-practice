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
import { getPublicUrl } from "@/utils/supabase/storage";
import { ServiceRequest } from "@/lib/clients/RequestServiceClient";
import Link from "next/link";
import { formatDateToInputValue } from "@/lib/utils";

interface customerRequest extends ServiceRequest {
	index: number;
}

interface ServiceFees {
	service_cost: number;
	agreement_fee: number;
}

interface Props {
	requests: customerRequest[];
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	toggleSelection: (id: string) => void;
	openRequestSheet: (request: ServiceRequest) => void;
	serviceFees: { [serviceId: string]: ServiceFees };
}

const TrackerTableView: React.FC<Props> = ({
	requests,
	selectedItems,
	setSelectedItems,
	toggleSelection,
	openRequestSheet,
	serviceFees,
}) => {
	return (
		<Table className="table-fixed w-full">
			<TableHeader>
				<TableRow className="border-b border-light-color text-sm">
					<TableHead className="w-[30px] pt-1">
						<input
							type="checkbox"
							className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
							checked={
								selectedItems.length === requests.length && requests.length > 0
							}
							onChange={() =>
								selectedItems.length === requests.length
									? setSelectedItems([])
									: setSelectedItems(requests.map((c) => c.id))
							}
						/>
					</TableHead>
					<TableHead className="w-[200px] ">Service</TableHead>
					<TableHead className="w-[100px] ">Service Cost</TableHead>
					<TableHead className="w-[110px] ">Agreement Fee</TableHead>
					<TableHead className="w-[80px] ">Schedule</TableHead>
					<TableHead className="w-[80px] ">Status</TableHead>
					<TableHead className="w-[80px] ">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.map((request) => {
					const fees = serviceFees[request.service_id];
					return (
						<TableRow key={request.id} className="hover:bg-gray-50">
							<TableCell>
								<input
									type="checkbox"
									className="w-3 h-3 border border-secondary rounded-sm text-primary"
									checked={selectedItems.includes(request.id)}
									onChange={() => toggleSelection(request.id)}
								/>
							</TableCell>
							<TableCell>

								<Link
									className="flex items-center gap-3"
									href={`/services/${request.service_id}`}
									target="_blank"
								>
									<Image
										src={
											request.service_photo
												? getPublicUrl(
														request.service_photo,
														"services-pictures"
													)
												: "/default-image.jpg"
										}
										alt={request.service_title}
										width={36}
										height={36}
										className="object-cover w-10 h-10 rounded-full"
									/>
									<div className="flex flex-col">
										<span className="font-semibold text-primary">
											{request.service_title}
										</span>
										<span className="text-gray-500 text-sm">
											{request.owner_name}
										</span>
									</div>
								</Link>
							</TableCell>
							<TableCell className="font-semibold">
								{fees
									? fees.service_cost === 0
										? "Free"
										: `₱${fees.service_cost.toLocaleString()}`
									: "Loading..."}
							</TableCell>

							<TableCell className="text-gray-500">
								{fees
									? fees.agreement_fee === 0
										? "Free"
										: `₱${fees.agreement_fee.toLocaleString()} - ${
												request.is_paid ? "Paid" : "Not Paid"
											}`
									: "Loading..."}
							</TableCell>
							<TableCell className="text-gray-500">
								{formatDateToInputValue(request.schedule_date)}
							</TableCell>
							<TableCell className="text-gray-500">{request.status}</TableCell>
							<TableCell className="flex gap-2">
								<ButtonClear onClick={() => openRequestSheet(request)}>
									<MessageIcon strokeWidth={2} className="w-6" />
								</ButtonClear>
								{request.is_paid ? (
									<div className="button-secondary background-3 text-secondary opacity-80">
										Pay
									</div>
								) : (
									<Link
										href={`/tracker/${request?.id}/payment`}
										className="button-secondary">
										Pay
									</Link>
								)}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default TrackerTableView;
