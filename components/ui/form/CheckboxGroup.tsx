"use client";
import React from "react";

interface CheckboxGroupProps {
  title?: string;
  subtitle?: string;
  options: string[];
  selected: string[];
  onChange: (updated: string[]) => void;
}

function CheckboxGroup({
                         title = "Other Information",
                         subtitle = "Check items that may apply",
                         options,
                         selected,
                         onChange,
                       }: CheckboxGroupProps) {
  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="form-1 flex flex-col items-start self-stretch gap-8">
      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <div className="text-xl font-semibold leading-[120%]">
          {title}
        </div>
        <div className="text-sm leading-[120%]">
          {subtitle}
        </div>
      </div>

      {/* Checkbox Items */}
      <div className="check_that_apply flex flex-col gap-3">
        {options.map((label, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 border-[1.2px] border-secondary rounded-sm text-primary"
              checked={selected.includes(label)}
              onChange={() => handleToggle(label)}
            />
            <span className="leading-normal">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckboxGroup;
