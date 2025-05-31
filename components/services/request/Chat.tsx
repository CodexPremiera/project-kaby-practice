"use client";

import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import {getCustomerName, ServiceRequest} from "@/lib/clients/RequestServiceClient";

interface ChatProps {
	request: ServiceRequest;
}

interface Message {
	id: string;
	request_id: string;
	message: string;
	sent_at: string;
	sender_id: string;
}

const Chat = ({ request } : ChatProps) => {
	const requestId = request.id;

	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = () => {
		if (newMessage.trim() === "") return;
		// setMessages((prev) => [...prev, { sender: "You", text: newMessage }]);
		setNewMessage("");
	};

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const res = await fetch(
						`/api/services/${request.service_id}/request/${requestId}/Chat`
				);

				if (!res.ok) {
					throw new Error('Failed to fetch chats');
				}

				const { chats } = await res.json();

				setMessages(chats);
			} catch (error) {
				console.error(error);
			}
		};

		if (requestId) {
			fetchRequests();
		}
	}, [requestId]);

	return (
		<div className="flex flex-col h-[310px] border border-gray-300  rounded-lg  overflow-hidden justify-between">
			<div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-700">
				Chatting with {getCustomerName(request)}
			</div>

			{/* Message History */}
			<div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 text-sm">
				{messages.length === 0 ? (
					<p className="text-gray-500 text-center mt-10">
						No messages yet. Start a conversation!
					</p>
				) : (
					messages.map((msg, idx) => (
						<div
							key={idx}
							className={`flex ${
								msg.sender_id === request.owner ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
									msg.sender_id === request.owner
										? "bg-secondary text-white"
										: "bg-white border border-gray-200"
								}`}
							>
								<p className="break-words whitespace-pre-wrap">{msg.message}</p>
							</div>
						</div>
					))
				)}
			</div>

			{/* Message Input */}
			<div className="fixed bottom-4 w-[420px] py-3 px-1 flex gap-2">
				<input
					type="text"
					placeholder="Type a message..."
					className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
				/>
				<Button onClick={handleSendMessage}>Send</Button>
			</div>
		</div>
	);
};

export default Chat;
