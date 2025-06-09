import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import ProfileTag from "@/components/profile/ProfileTag";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import Image from "next/image";
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import { EllipsisVertical as MoreIcon } from "lucide-react";

function BadgeRequestsTable({
	filteredClients,
	selectedItems,
	toggleSelection,
	handleSelectAll,
}) {
	const router = useRouter();

	return (
		<div className="w-full">
			<div className="flex w-full border-b border-light-color pb-6 gap-4 items-center">
				<input
					type="checkbox"
					className="w-3 h-3 border-[1.2px] border-secondary rounded-sm text-primary"
					checked={
						selectedItems.length === filteredClients.length &&
						filteredClients.length > 0
					}
					onChange={handleSelectAll}
				/>
				<span>Select all items</span>
			</div>

			<div className="flex flex-col">
				{filteredClients.map((profile) => (
					<div
						key={profile.index}
						className="flex w-full hover:bg-gray-50 border-b border-light-color py-5 justify-between"
					>
						<div className="flex w-fit gap-2 sm:gap-3">
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
									/*src={profile.image}*/
									src={"/assets/img/service-img.png"}
									alt={`${profile.name}'s Avatar`}
									width={36}
									height={36}
									className="object-cover w-10 h-10 rounded-full"
								/>
							</div>

							<div className="user_name flex flex-col justify-center items-start h-fit gap-1/2">
								<span className="text-primary font-semibold text-base sm:text-md">
									{profile.name}
								</span>
								<div className="flex flex-col">
									<span className="text-secondary text-sm leading-[1.4] font-medium">
										Mangrove Tree Planting
									</span>
									<span className="text-secondary text-sm leading-[1.2] font-medium">
										{format(profile.date, "MMMM dd, yyyy")}
									</span>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-center h-18"></div>
					</div>
				))}
			</div>
		</div>
	);
}

export default BadgeRequestsTable;
