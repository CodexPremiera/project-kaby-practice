"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Profile {
	id: string;
	name: string;
	address: string;
	image: string;
}

interface ChatProps {
	profile: Profile;
}

const Chat: React.FC<ChatProps> = ({ profile }) => {
	const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
		[]
	);
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = () => {
		if (newMessage.trim() === "") return;
		setMessages((prev) => [...prev, { sender: "You", text: newMessage }]);
		setNewMessage("");
	};

	return (
		<div className="flex flex-col h-[310px] border border-gray-300  rounded-lg  overflow-hidden justify-between">
			<div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-700">
				Chatting with {profile.name}
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
								msg.sender === "You" ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
									msg.sender === "You"
										? "bg-secondary text-white"
										: "bg-white border border-gray-200"
								}`}
							>
								<p className="break-words whitespace-pre-wrap">{msg.text}</p>
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
