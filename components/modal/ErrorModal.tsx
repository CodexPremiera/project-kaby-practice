"use client";

import React from "react";
import { RiCloseFill, RiCloseLine } from "react-icons/ri";

interface ErrorModalProps {
	title: string;
	content: string;
	onClose: () => void;
}

const ErrorModal = ({ title, content, onClose }: ErrorModalProps) => {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
			<button
				onClick={onClose}
				className="absolute top-5 right-5 text-white hover:text-black text-3xl z-50"
			>
				<RiCloseFill className="text-white w-[25px] h-[25px]" />
			</button>
			<div className="relative flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-[350px]">
				<div className="w-[40px] h-[40px] bg-red-500 rounded-full flex items-center justify-center mb-4">
					<RiCloseLine className="text-white w-6 h-6" />
				</div>

				<h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
				<p className="text-sm text-center text-gray-600 mb-4">{content}</p>

				<button
					onClick={onClose}
					className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default ErrorModal;
