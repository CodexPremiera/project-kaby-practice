"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";

function PasswordField({ value, onChange, placeholder = "***********", editable = false }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditable, setIsEditable] = useState(editable);
  const color = isEditable ? "text-primary" : "text-secondary";

  return (
    <div className="flex w-full gap-3 items-center">
      <div className="flex flex-col w-full gap-4">
        <div
          className={`flex items-center gap-2.5 py-3 px-3 rounded-xl border border-secondary ${
            isEditable ? "" : "background-1"
          } w-full transition duration-200`}
        >
          <input
            type={showPassword ? "text" : "password"}
            className="w-full outline-none leading-[12px] disabled:cursor-default text-secondary"
            disabled={!isEditable}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => {
              if (isEditable) setShowPassword(!showPassword);
            }}
            className="transition duration-200"
          >
            {showPassword ? (
              <EyeOff className="size-6 stroke-[2]" />
            ) : (
              <Eye className="size-6 stroke-[2]" />
            )}
          </button>
        </div>
      </div>

      <ButtonSecondary
        onClick={() => {
          setIsEditable(!isEditable);
          setShowPassword(false);
        }}
        className="shrink-0 flex justify-center items-center gap-2.5 py-3 px-4 h-10 rounded-[1.25rem] backgroun font-inter font-semibold leading-[12px] mt-4"
      >
        Change
      </ButtonSecondary>
    </div>
  );
}

export default PasswordField;
