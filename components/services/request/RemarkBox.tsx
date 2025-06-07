import React from "react";
import {Remark} from "@/types/ChatType";

interface RemarkBoxProps {
  message: Remark;
  isOwner: boolean;
}

const RemarkBox: React.FC<RemarkBoxProps> = ({ message, isOwner }) => {
  return (
    <div className={`flex ${isOwner ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
          isOwner ? "bg-accent text-inverse-1" : "background-3"
        }`}
      >
        <p className="break-words whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default RemarkBox;
