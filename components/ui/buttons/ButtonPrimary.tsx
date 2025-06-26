import clsx from "clsx";
import React from "react";

interface CustomButtonProps {
	onClick?: (e?: any) => void | Promise<void>;
	disabled?: boolean;
	type?: "button" | "submit" | "reset" | string;
	children: React.ReactNode;
	className?: string;
}

const ButtonPrimary: React.FC<CustomButtonProps> = ({
	onClick,
	disabled = false,
	type = "button",
	children,
	className = "",
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx("button-primary", disabled && "opacity-50", className)}
		>
			{children}
		</button>
	);
};

export default ButtonPrimary;
