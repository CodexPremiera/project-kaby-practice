import React from "react";
import {Message} from "@/types/ChatType";

interface ChatboxProps {
  message: Message;
  isOwner: boolean;
}

const Chatbox: React.FC<ChatboxProps> = ({ message, isOwner }) => {
  return (
    <div className={`flex ${isOwner ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
          isOwner ? "bg-accent text-inverse-1" : "background-3"
        }`}
      >
        <p className="break-words whitespace-pre-wrap">{message.message}</p>
      </div>
    </div>
  );
};

export default Chatbox;
