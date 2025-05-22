"use client";
import React from "react";

interface SelectFieldProps {
  field_name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  hasChanged?: boolean;
  className?: string
}

const SelectField = ({
                       field_name = "Field name",
                       value,
                       onChange,
                       options,
                       hasChanged = false,
                       className = "",
                     }: SelectFieldProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <span className="text-sm">{field_name}</span>
      <div className="flex items-center gap-2.5 py-3 px-3 rounded-xl border border-secondary w-full transition duration-200">
        <select
          className={`w-full outline-none font-inter bg-transparent text-primary ${className}`}
          value={value}
          onChange={onChange}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
