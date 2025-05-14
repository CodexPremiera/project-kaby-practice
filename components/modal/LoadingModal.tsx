import React from "react";
import { RiCheckLine } from "react-icons/ri";

type LoadingModalProps = {
	title: string;
	content: string;
};

export default function LoadingModal({ title, content }: LoadingModalProps) {
	return (
		<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
			<div className="relative flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-[350px]">
				<div className="w-[40px] h-[40px] bg-green-500 rounded-full flex items-center justify-center mb-4">
					<RiCheckLine className="text-white w-6 h-6" />
				</div>
				<h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
				<div className="loader mb-4"></div>
				<p className="text-sm text-center text-gray-600 mb-4">{content}</p>
			</div>
		</div>
	);
}
