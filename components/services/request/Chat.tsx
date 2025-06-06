"use client";

import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import {getCustomerName, ServiceRequest} from "@/lib/clients/RequestServiceClient";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import TextField from "@/components/ui/form/TextField";
import Chatbox from "@/components/services/request/Chatbox";
import {useUser} from "@/app/context/UserContext";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
	const userId = useUser().userId;

	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = async () => {
		if (newMessage.trim() === "") return;

		try {
			const res = await fetch(`/api/services/${request.service_id}/request/${request.id}/Chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: newMessage,
					sender_id: userId,
				}),
			});

			if (!res.ok) throw new Error("Failed to send message");

			setNewMessage("");
		} catch (error) {
			console.error(error);
		}
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

	useEffect(() => {
		if (!requestId) return;

		const supabase = createClientComponentClient<>();

		const channel = supabase
			.channel(`chat-${requestId}`)
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'TransactionChats',
					filter: `request_id=eq.${requestId}`,
				},
				(payload) => {
					const newMessage = payload.new;
					setMessages((prev) => [...prev, newMessage]);
				}
			)
			.subscribe();

		// Cleanup on unmount
		return () => {
			supabase.removeChannel(channel);
		};
	}, [requestId]);


	return (
		<div className="flex flex-col h-full w-full justify-between">
			<div className="flex flex-col gap-1 w-full h-[300px] border border-light-color rounded-lg">
				<span className="p-3 border-b border-light-color text-sm font-medium text-primary-1">
					Chatting with {getCustomerName(request)}
				</span>

				{/* Message History */}
				<div className="overflow-hidden flex-1 overflow-y-auto p-3 space-y-2 text-sm gap-1 flex flex-col">
					{messages.length === 0 ? (
						<p className="text-gray-500 text-center mt-10">
							No messages yet. Start a conversation!
						</p>
					) : (
						messages.map((msg) => {
							if (!msg || !msg.sender_id) return null; // Skip invalid message

							return (
								<Chatbox
									key={msg.id}
									message={msg}
									isOwner={msg.sender_id === userId}
								/>
							);
						})
					)}
				</div>
			</div>

			{/* Message Input */}
			<div className="bottom-4 w-full py-3 flex gap-2 items-center">
				<TextField
					className="border-light-color"
					placeholder="Type a message..."
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
				/>
				<ButtonSecondary onClick={handleSendMessage}>
					Send
				</ButtonSecondary>
			</div>
		</div>
	);
};

export default Chat;
