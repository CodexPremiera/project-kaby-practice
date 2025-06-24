import React from "react";
import {Remark} from "@/types/ChatType";
import {timeAgo} from "@/utils/timeAgo";

interface RemarkBoxProps {
  message: Remark;
  isOwner: boolean;
}

const RemarkBox: React.FC<RemarkBoxProps> = ({ message, isOwner }) => {
  return (
    <div className="flex flex-col gap-1 pt-2">
      <div
        className={`flex w-fit px-3 py-2 rounded-lg max-w-[70%] break-words ${
          isOwner ? "bg-accent text-inverse-1" : "background-3"
        }`}
      >
        <p className="break-words whitespace-pre-wrap">{message.content}</p>
      </div>
      <span className="flex text-xs text-primary-1 px-1 italic">
        {timeAgo(message.sent_at)}
      </span>
    </div>
  );
};

export default RemarkBox;
