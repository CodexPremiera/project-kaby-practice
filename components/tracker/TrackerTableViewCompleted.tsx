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
import { getPublicUrl } from "@/utils/supabase/storage";
import { ServiceRequest } from "@/lib/clients/RequestServiceClient";
import Link from "next/link";
import { formatDateToInputValue } from "@/lib/utils";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import GiveRatingDialog from "@/components/tracker/GiveRatingDialog";

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

const TrackerTableViewCompleted: React.FC<Props> = ({
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
					<TableHead className="w-[220px] ">Service</TableHead>
					<TableHead className="w-[120px] ">Service Cost</TableHead>
					<TableHead className="w-[120px] ">Agreement Fee</TableHead>
					<TableHead className="w-[80px] ">Schedule</TableHead>
					<TableHead className="w-[110px] ">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.map((request) => {
					const fees = serviceFees[request.service_id];
					return (
						<TableRow key={request.id} className="hover:bg-gray-50">
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
										className="object-cover w-12 h-10 rounded-xl"
									/>
									<div className="flex flex-col w-full truncate">
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

							<TableCell className="flex gap-2">
								<GiveRatingDialog requestId={request.id} currentRating={request.ratings} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default TrackerTableViewCompleted;
