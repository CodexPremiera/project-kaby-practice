import clsx from "clsx";
import React from "react"; // optional, for conditional class names

interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ButtonSecondary: React.FC<CustomButtonProps> = ({
                                               onClick,
                                               disabled = false,
                                               children,
                                               className = "",
                                             }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "shrink-0 flex justify-center items-center gap-2.5 py-3 px-4 h-10 rounded-[1.25rem] font-inter font-semibold" +
        " leading-[12px] transition duration-200",
        "bg-[#e9e9e9] text-[#111] hover:bg-[#F1F1F1] active:bg-[#E9E9E9] cursor-pointer",
        disabled && "opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;