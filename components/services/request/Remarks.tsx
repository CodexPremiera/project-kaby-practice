"use client";

import {useEffect, useState} from "react";
import {getCustomerName, ServiceRequest} from "@/lib/clients/RequestServiceClient";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import TextField from "@/components/ui/form/TextField";
import RemarkBox from "@/components/services/request/RemarkBox";
import {useUser} from "@/app/context/UserContext";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {Remark} from "@/types/ChatType";

interface RemarkProps {
	request: ServiceRequest;
}

const Remark = ({ request }: RemarkProps) => {
	const requestId = request.id;
	const userId = useUser().userId;

	const [remarks, setRemarks] = useState<Remark[]>([]);
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = async () => {
		if (newMessage.trim() === "") return;

		try {
			const res = await fetch(`/api/services/${request.service_id}/request/${request.id}/Remark`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: newMessage }),
			});

			if (!res.ok) throw new Error("Failed to send remark");

			setNewMessage("");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchRemarks = async () => {
			try {
				const res = await fetch(
					`/api/services/${request.service_id}/request/${requestId}/Remark`);

				if (!res.ok) {
					throw new Error("Failed to fetch remarks");
				}

				const { remarks } = await res.json();
				setRemarks(remarks);
			} catch (error) {
				console.error(error);
			}
		};

		if (requestId) {
			fetchRemarks();
		}
	}, [requestId]);

	useEffect(() => {
		if (!requestId) return;

		const supabase = createClientComponentClient();

		const channel = supabase
			.channel(`remark-${requestId}`)
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "TransactionRemarks",
					filter: `request_id=eq.${requestId}`,
				},
				(payload) => {
					const newRemark: Remark = payload.new;
					setRemarks((prev) => [...prev, newRemark]);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [requestId]);

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 text-sm">
				{/* Remarks History */}
				{remarks.length === 0 ? (
					<p className="text-gray-500 text-center mt-10">
						No remarks yet. Start the discussion!
					</p>
				) : (
					remarks.map((remark) => (
						<RemarkBox key={remark.id} message={remark} isOwner/>
					))
				)}
			</div>

			{/* Input */}
			{userId === request.owner_id && (
				<div className="border-t-2 border-light-color w-full py-4 px-4 flex gap-2 items-center">
					<TextField
						className="border-light-color"
						placeholder="Type a remark..."
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
					/>
					<ButtonSecondary onClick={handleSendMessage}>Send</ButtonSecondary>
				</div>
			)}
		</div>
	);
};

export default Remark;
