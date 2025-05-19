"use client";
import React from "react";
import {Search} from "lucide-react";

interface TextFieldProps {
  field_name?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string,
}

function SearchBar({
                     field_name = "",
                     placeholder = "Enter text",
                     type = "text",
                     value,
                     onChange,
                     onKeyDown,
                     className = "",
                   }: TextFieldProps) {

  return (
    <div className="flex flex-col w-full gap-1">
      {field_name && <span className="text-sm">{field_name}</span>}
      <div
        className={`flex items-center gap-2.5 py-2 px-4 rounded-full border border-secondary w-full transition duration-200 text-primary ${className}`}
      >
        <input
          type={type}
          className={`w-full outline-none text-primary`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <Search className="text-secondary h-full" />
      </div>
    </div>
  );
}

export default SearchBar;
