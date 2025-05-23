"use client";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	BsThreeDots,
	BsPinAngle,
	BsPencilSquare,
	BsTrash,
} from "react-icons/bs";

const MANAGE_POST = [
	{ title: "Pin", icon: BsPinAngle },
	{ title: "Edit", icon: BsPencilSquare },
	{ title: "Delete", icon: BsTrash },
];

interface ManagePostProps {
	onAction: (action: string) => void;
}

const ManagePostMenu: React.FC<ManagePostProps> = ({ onAction }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<BsThreeDots className="text-primary" />
			</PopoverTrigger>
			<PopoverContent className="w-45 p-2 bg-white">
				{MANAGE_POST.map(({ title, icon: Icon }) => (
					<div
						key={title}
						onClick={() => onAction(title)}
						className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/10 cursor-pointer transition"
					>
						<div className="flex justify-between w-full items-center">
							<span className="text-sm">{title}</span>
							<Icon size={12} />
						</div>
					</div>
				))}
			</PopoverContent>
		</Popover>
	);
};

export default ManagePostMenu;
