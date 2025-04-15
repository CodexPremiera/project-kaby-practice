"use client"

import {Eye, EyeOff} from "lucide-react";
import { useState } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";

function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const color = isEditable ? "#111111" : "#767676";

  return (
    <div className="flex w-full gap-3 items-center">
      <div className="flex flex-col w-full gap-1">
        <span className="text-sm">
          Password
        </span>
        <div
          className={`flex items-center gap-2.5 py-3 px-3 rounded-xl border-2 border-[#cdcdcd] ${isEditable ? "" : "bg-[#F1F1F1]"} w-full transition duration-200`}>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full  outline-none font-inter text-[#111111] leading-[12px] disabled:cursor-default disabled:text-[#777]"
            disabled={!isEditable}
            placeholder="***********"
          />
          <button
            type="button"
            onClick={() => {
              isEditable ? setShowPassword(!showPassword) : "";
            }}
            className={`${isEditable ? "text-[#767676]" : "text-[#CDCDCD]"} transition duration-200`}
          >
            {showPassword ? (
              <EyeOff className="size-6 stroke-[2]"/>
            ) : (
              <Eye className="size-6 stroke-[2]"/>
            )}
          </button>
        </div>
      </div>


      <ButtonSecondary
        onClick={() => {
          setIsEditable(!isEditable);
          setShowPassword(false);
        }}
        className="shrink-0 flex justify-center items-center gap-2.5 py-3 px-4 h-10 rounded-[1.25rem] bg-[#e9e9e9] text-[#111] font-inter font-semibold leading-[12px] mt-4"
      >
        Change
      </ButtonSecondary>
    </div>

  );
}

export default PasswordField;