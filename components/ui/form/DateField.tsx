"use client";
import React from "react";

interface DateFieldProps {
  field_name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasChanged?: boolean;
  className?: string
}

function DateField({
                     field_name = "Field name",
                     value,
                     onChange,
                     hasChanged,
                     className = ""
                   }: DateFieldProps) {

  return (
    <div className="flex flex-col w-full gap-1">
      <span className="text-sm">{field_name}</span>
      <div className="flex items-center gap-2.5 py-3 px-3 rounded-xl border border-secondary w-full transition duration-200">
        <input
          type="date"
          className={`w-full outline-none font-inter bg-transparent text-primary ${className}`}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default DateField;
