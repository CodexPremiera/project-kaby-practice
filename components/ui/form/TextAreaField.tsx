"use client";
import { useState } from "react";

interface TextAreaFieldProps {
  field_name?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasChanged?: boolean
}

function TextAreaField({
                         field_name = "Text Area",
                         placeholder = "Enter your message",
                         rows = 3,
                         value = "",
                         onChange,
                         hasChanged = true
                       }: TextAreaFieldProps) {
  const color = hasChanged ? "text-secondary" : "text-secondary";

  return (
    <div className="flex flex-col w-full gap-1">
      <span className="text-sm">{field_name}</span>
      <div
        className={`flex items-center py-3 px-3 rounded-xl border-2 border-primary ${
          hasChanged ? "text-[#111111]" : "text-[#a1a1a1]"
        } w-full transition duration-200`}
      >
        <textarea
          rows={rows}
          className={`w-full resize-none outline-none leading-[1.25rem] text-[${color}] bg-transparent`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default TextAreaField;
