import clsx from "clsx";
import React from "react"; // optional, for conditional class names

interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

const SwitchTab: React.FC<CustomButtonProps> = ({
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
        "switch-tab",
        disabled && "opacity-50",
        active ? "border-accent" : "border-transparent",
        className
      )}
    >
      {children}
    </button>
  );
};

export default SwitchTab;