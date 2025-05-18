'use client';

import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";

interface CustomButtonProps {
  icon: React.ReactNode;
  modal?: React.ReactNode;
  disabled?: boolean;
}

const ButtonDropdown: React.FC<CustomButtonProps> = ({
                                                   icon,
                                                   modal,
                                                   disabled = false,
                                                 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "relative flex items-center",
        disabled && "opacity-50"
      )}
      ref={wrapperRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex text-secondary stroke-2 w-fit cursor-pointer"
      >
        {icon}
      </button>

      {isOpen && modal}
    </div>
  );
};

export default ButtonDropdown;
