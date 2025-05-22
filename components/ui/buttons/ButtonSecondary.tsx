import clsx from "clsx";
import React from "react";

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
      className={clsx("button-secondary", disabled && "background-3 text-secondary opacity-80", className)}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;