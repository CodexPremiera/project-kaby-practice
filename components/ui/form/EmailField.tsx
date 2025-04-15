"use client";
import { useState } from "react";

interface EmailFieldProps {
  field_name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasChanged?: boolean
}

function EmailField({
                      field_name = "Email Address",
                      placeholder = "Enter your email",
                      value,
                      onChange,
                      hasChanged
                    }: EmailFieldProps) {
  const color = hasChanged ? "#111111" : "#a1a1a1";

  return (
    <div className="flex flex-col w-full gap-1">
      <span className="text-sm">{field_name}</span>
      <div
        className={`flex items-center gap-2.5 py-3 px-3 rounded-xl border-2 border-[#cdcdcd] w-full transition duration-200`}
      >
        <input
          type="email"
          className={`w-full outline-none font-inter leading-[12px] text-[${color}]`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default EmailField;
