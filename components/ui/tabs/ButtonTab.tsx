import clsx from "clsx";
import React from "react"; // optional, for conditional class names

interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ButtonTab: React.FC<CustomButtonProps> = ({
                                                  onClick,
                                                  disabled = false,
                                                  active = false,
                                                  children,
                                                  className = "",
                                                }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "button-tab",
        disabled && "opacity-50",
        active ? "bg-inverse-1 text-inverse-1" : "background-1 text-secondary-2 border-1 border-light-3",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonTab;