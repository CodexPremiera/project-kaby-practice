import clsx from "clsx";
import React from "react";

interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ButtonClear: React.FC<CustomButtonProps> = ({
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
      className={clsx("button-clear", className)}
    >
      {children}
    </button>
  );
};

export default ButtonClear;