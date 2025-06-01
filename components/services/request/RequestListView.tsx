import React from "react";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import { MessageCircleMore as MessageIcon } from "lucide-react";
import { Request } from "@/lib/clients/RequestServiceClient";
import { getPublicUrl } from "@/utils/supabase/storage";

type RequestListViewProps = {
	requests: Request[];
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	toggleSelection: (id: string) => void;
	openRequestSheet: (request: Request) => void;
};

const RequestListView: React.FC<RequestListViewProps> = ({
	requests,
	selectedItems,
	setSelectedItems,
	toggleSelection,
	openRequestSheet,
}) => {
	const allSelected =
		selectedItems.length === requests.length && requests.length > 0;

	const toggleSelectAll = () => {
		if (allSelected) {
			setSelectedItems([]);
		} else {
			setSelectedItems(requests.map((r) => r.id));
		}
	};

	return (
		<div className="table-fixed w-full">
			<div className="flex w-full border-b border-light-color pb-6 gap-4 items-center">
				<input
					type="checkbox"
					className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
					checked={allSelected}
					onChange={toggleSelectAll}
				/>
				<span>Select all items</span>
			</div>

			<div className="flex flex-col">
				{requests.map((request) => (
					<div
						key={request.customer_name}
						className="flex w-full hover:bg-gray-50 border-b border-light-color py-5 justify-between"
					>
						<div className="flex w-[18.75rem] gap-2 sm:gap-3">
							<div className="h-full w-fit py-3 pr-1 sm:pr-6">
								<input
									type="checkbox"
									className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
									checked={selectedItems.includes(request.customer_name)}
									onChange={() => toggleSelection(request.customer_name)}
								/>
							</div>

							<div className="p-1">
								<Image
									src={
										request.customer_photo
											? getPublicUrl(request.customer_photo, "profile-pictures")
											: "/default-image.jpg"
									}
									alt={`${request.customer_name}'s Photo`}
									width={36}
									height={36}
									className="object-cover w-10 h-10 rounded-full"
								/>
							</div>

							<div className="user_name flex flex-col justify-center items-start h-fit">
								<span className="text-primary font-semibold text-base sm:text-md">
									{request.customer_name}
								</span>
								<div className="flex flex-col gap-0">
									<span className="text-secondary text-sm leading-[1.2] font-medium">
										{request.customer_address}
									</span>
									<span className="text-secondary text-sm leading-[1.2] font-medium">
										{request.schedule_date.toLocaleDateString()} •{" "}
										{request.status}
									</span>
								</div>
							</div>
						</div>

						<ButtonClear onClick={() => openRequestSheet(request)}>
							<MessageIcon strokeWidth={2} className="w-6 p-0" />
						</ButtonClear>
					</div>
				))}
			</div>
		</div>
	);
};

export default RequestListView;
