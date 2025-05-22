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
			<PopoverContent className="w-40 p-2 bg-white">
				{MANAGE_POST.map(({ title, icon: Icon }) => (
					<div
						key={title}
						onClick={() => onAction(title)}
						className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-secondary/10 cursor-pointer transition"
					>
						<Icon size={18} />
						<span className="text-sm">{title}</span>
					</div>
				))}
			</PopoverContent>
		</Popover>
	);
};

export default ManagePostMenu;
