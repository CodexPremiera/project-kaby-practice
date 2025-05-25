import React, { useState } from "react";
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

type ServiceProfile = {
	id: string;
	index: number;
	service: {
		image: string;
		title: string;
		owner: string;
	};
};

type EditableRow = {
	index: number;
	schedule: string;
	status: string;
};

type RequestTableViewProps = {
	filteredClients: ServiceProfile[];
	selectedItems: number[];
	setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
	toggleSelection: (index: number) => void;
	openRequestSheet: (profile: ServiceProfile) => void;
};

const RequestTableView: React.FC<RequestTableViewProps> = ({
	filteredClients,
	selectedItems,
	setSelectedItems,
	toggleSelection,
	openRequestSheet,
}) => {
	const router = useRouter();

	const [editableData, setEditableData] = useState<EditableRow[]>(
		filteredClients.map((client) => ({
			index: client.index,
			schedule: "2025-04-23",
			status: "Pending",
		}))
	);

	const handleInputChange = (
		index: number,
		field: keyof EditableRow,
		value: string
	) => {
		setEditableData((prev) =>
			prev.map((item) =>
				item.index === index ? { ...item, [field]: value } : item
			)
		);
	};

	const handleSubmit = (index: number) => {
		const data = editableData.find((item) => item.index === index);
		console.log("Submitting for:", index, data);
	};

	return (
		<Table className="table-fixed w-full">
			<TableHeader>
				<TableRow className="border-b border-light-color text-sm">
					<TableHead className="w-[30px] pt-1 pb-5">
						<input
							type="checkbox"
							className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
							checked={
								selectedItems.length === filteredClients.length &&
								filteredClients.length > 0
							}
							onChange={() =>
								selectedItems.length === filteredClients.length
									? setSelectedItems([])
									: setSelectedItems(filteredClients.map((c) => c.index))
							}
						/>
					</TableHead>
					<TableHead className="w-[200px] text-secondary text-sm pt-1 pb-5">
						Client
					</TableHead>
					<TableHead className="w-[140px] text-secondary text-sm pt-1 pb-5">
						Schedule
					</TableHead>
					<TableHead className="w-[80px] text-secondary text-sm pt-1 pb-5">
						Payment
					</TableHead>
					<TableHead className="w-[120px] text-secondary text-sm pt-1 pb-5">
						Status
					</TableHead>
					<TableHead className="w-[90px] text-secondary text-sm pt-1 pb-5">
						Actions
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody className="border-b border-light-color">
				{filteredClients.map((profile) => {
					const rowData = editableData.find(
						(item) => item.index === profile.index
					);

					return (
						<TableRow
							key={profile.index}
							className="hover:bg-gray-50 border-light-color h-18"
						>
							<TableCell>
								<input
									type="checkbox"
									className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
									checked={selectedItems.includes(profile.index)}
									onChange={() => toggleSelection(profile.index)}
								/>
							</TableCell>

							<TableCell>
								<button
									className="flex items-center gap-3 w-[18.75rem]"
									onClick={() => router.push(`/profile/${profile.id}`)}
								>
									<Image
										src={profile.service.image}
										alt={`${profile.service.title}'s Avatar`}
										width={36}
										height={36}
										className="object-cover w-10 h-10 rounded-full"
									/>
									<div className="user_name flex flex-col justify-center items-start p-1 h-9">
										<div className="text-primary font-semibold text-md">
											{profile.service.title}
										</div>
										<div className="text-secondary text-sm">
											{profile.service.owner}
										</div>
									</div>
								</button>
							</TableCell>

							<TableCell>
								<input
									type="date"
									value={rowData?.schedule}
									onChange={(e) =>
										handleInputChange(profile.index, "schedule", e.target.value)
									}
									className="border rounded px-2 py-1 text-sm"
								/>
							</TableCell>

							<TableCell>Not Paid</TableCell>

							<TableCell>
								<select
									value={rowData?.status}
									onChange={(e) =>
										handleInputChange(profile.index, "status", e.target.value)
									}
									className="border rounded px-2 py-1 text-sm"
								>
									<option value="Pending">Pending</option>
									<option value="Ongoing">Ongoing</option>
									<option value="Completed">Completed</option>
									<option value="Cancelled">Cancelled</option>
								</select>
							</TableCell>

							<TableCell className="flex items-center gap-2">
								<ButtonClear onClick={() => openRequestSheet(profile)}>
									<MessageIcon strokeWidth={2} className="w-6 p-0" />
								</ButtonClear>

								<button
									onClick={() => handleSubmit(profile.index)}
									className="text-xs px-2 py-1 bg-gray-200 text-black rounded"
								>
									Submit
								</button>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default RequestTableView;
