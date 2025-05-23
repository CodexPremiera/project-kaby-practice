import React from "react";

interface PretitleProps {
	text: string;
	center?: boolean;
}

const Pretitle = ({ text, center }: PretitleProps) => {
	return (
		<div
			className={`flex items-center gap-6 mb-4 ${
				center ? "justify-center" : ""
			}`}
		>
			<div className="w-3 h-3 bg-secondary rotate-45"></div>
			<h2 className="pl-1 text-4xl font-bold ">{text}</h2>
			<div className="w-3 h-3 bg-secondary rotate-45"></div>
		</div>
	);
};

export default Pretitle;
