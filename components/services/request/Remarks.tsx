import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {ServiceRequest} from "@/lib/clients/RequestServiceClient";


interface ChatProps {
	request: ServiceRequest;
}

interface Remark {
	text: string;
	date: Date;
}

const Remarks: React.FC<ChatProps> = ({ request }) => {
	const [remarks, setRemarks] = useState<Remark[]>([]);
	const [newRemark, setNewRemark] = useState("");

	const handleAddRemark = () => {
		if (newRemark.trim() === "") return;
		const remark: Remark = {
			text: newRemark,
			date: new Date(),
		};
		setRemarks([...remarks, remark]);
		setNewRemark("");
	};

	return (
		<div className="flex flex-col h-[310px] border border-gray-300 rounded-lg overflow-hidden bg-white">
			{/* Header */}
			<div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-700">
				Remarks for {request.customer_fname}
			</div>

			{/* Remarks History */}
			<div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-gray-50">
				{remarks.length === 0 ? (
					<p className="text-gray-500 text-center mt-10">
						No remarks yet. Add one below!
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

			{/* Input Area */}
			<div className="fixed bottom-4 w-[420px] py-3 px-1 flex gap-2">
				<input
					type="text"
					placeholder="Type a remark..."
					className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
					value={newRemark}
					onChange={(e) => setNewRemark(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleAddRemark()}
				/>
				<Button onClick={handleAddRemark}>Add</Button>
			</div>
		</div>
	);
};

export default Remarks;
