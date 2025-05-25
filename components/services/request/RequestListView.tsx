import React from "react";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import { MessageCircleMore as MessageIcon } from "lucide-react";

type ServiceProfile = {
	id: string;
	index: number;
	service: {
		image: string;
		title: string;
		owner: string;
	};
};

type RequestListViewProps = {
	filteredClients: ServiceProfile[];
	selectedItems: number[];
	setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
	toggleSelection: (index: number) => void;
	openRequestSheet: (profile: ServiceProfile) => void;
};

const RequestListView: React.FC<RequestListViewProps> = ({
	filteredClients,
	selectedItems,
	setSelectedItems,
	toggleSelection,
	openRequestSheet,
}) => {
	return (
		<div className="table-fixed w-full">
			<div className="flex w-full border-b border-light-color pb-6 gap-4 items-center">
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
				<span>Select all items</span>
			</div>

			<div className="flex flex-col">
				{filteredClients.map((profile) => (
					<div
						key={profile.index}
						className="flex w-full hover:bg-gray-50 border-b border-light-color py-5 justify-between"
					>
						<div className="flex w-[18.75rem] gap-2 sm:gap-3">
							<div className="h-full w-fit py-3 pr-1 sm:pr-6">
								<input
									type="checkbox"
									className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
									checked={selectedItems.includes(profile.index)}
									onChange={() => toggleSelection(profile.index)}
								/>
							</div>

							<div className="p-1">
								<Image
									src={profile.service.image}
									alt={`${profile.service.title}'s Avatar`}
									width={36}
									height={36}
									className="object-cover w-10 h-10 rounded-full"
								/>
							</div>

							<div className="user_name flex flex-col justify-center items-start h-fit">
								<span className="text-primary font-semibold text-base sm:text-md">
									{profile.service.title}
								</span>
								<div className="flex flex-col gap-0">
									<span className="text-secondary text-sm leading-[1.2] font-medium">
										{profile.service.owner}
									</span>
									<span className="text-secondary text-sm leading-[1.2] font-medium">
										Last month • Pending
									</span>
								</div>
							</div>
						</div>

						<ButtonClear onClick={() => openRequestSheet(profile)}>
							<MessageIcon strokeWidth={2} className="w-6 p-0" />
						</ButtonClear>
					</div>
				))}
			</div>
		</div>
	);
};

export default RequestListView;
