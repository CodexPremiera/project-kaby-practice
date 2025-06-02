import { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Profile {
	id: string;
	name: string;
	address: string;
	image: string;
}

interface DetailsProps {
	profile: Profile;
}

interface Details {
	text: string;
	date: Date;
}

const Details: React.FC<DetailsProps> = ({ profile }) => {
	const [remarks, setRemarks] = useState<Details[]>([]);
	const [newRemark, setNewRemark] = useState("");

	const handleAddRemark = () => {
		if (newRemark.trim() === "") return;
		const remark: Details = {
			text: newRemark,
			date: new Date(),
		};
		setRemarks([...remarks, remark]);
		setNewRemark("");
	};

	return (
		<div className="flex flex-col h-[280px] border border-gray-300 rounded-lg overflow-hidden bg-white">
			{/* Header */}
			<div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-700">
				Requirements
			</div>

			{/* Requirements Files */}
			<div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-gray-50">
				{remarks.length === 0 ? (
					<p className="text-gray-500 text-center mt-10">
						No requirements added.
					</p>
				) : (
					remarks.map((remark, idx) => (
						<div
							key={idx}
							className="border border-gray-200 rounded p-2 bg-white"
						>
							<p className="text-gray-700">{remark.text}</p>
							<p className="text-xs text-gray-500 mt-1">
								Date posted: {format(remark.date, "PPpp")}
							</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Details;
