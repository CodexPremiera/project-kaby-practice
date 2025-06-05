"use client";
import React, { useState } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";

interface TextFieldProps {
  field_name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasChanged?: boolean
  className?: string
}

function TextField({
                     field_name,
                     placeholder = "Enter text",
                     value,
                     onChange,
                     hasChanged
                   }: TextFieldProps) {
  const color = hasChanged ? "text-primary" : "text-secondary";

  return (
    <div className="flex flex-col w-full gap-1">
      {field_name && <span className="text-sm">{field_name}</span>}
      <div
        className={`flex items-center gap-2.5 py-3 px-3 rounded-xl border border-secondary w-full transition duration-200`}
      >
        <input
          type="text"
          className={`w-full outline-none font-inter leading-[12px] text-[${color}]`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default TextField;
