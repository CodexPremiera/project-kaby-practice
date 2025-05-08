import clsx from "clsx";
import React from "react"; // optional, for conditional class names

interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ButtonPrimary: React.FC<CustomButtonProps> = ({
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
      className={clsx("button-primary", disabled && "opacity-50", className)}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;