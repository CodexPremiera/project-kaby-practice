"use client";

import React from "react";
import { RiCloseFill, RiCheckLine } from "react-icons/ri";

interface SuccessModalProps {
	title: string;
	content: string;
	onClose: () => void;
}

const SuccessModal = ({ title, content, onClose }: SuccessModalProps) => {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
			<button
				onClick={onClose}
				className="absolute top-5 right-5 text-white hover:text-black text-3xl z-50"
			>
				<RiCloseFill className="w-[25px] h-[25px]" />
			</button>

			<div className="relative flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-[350px]">
				<div className="w-[40px] h-[40px] bg-green-500 rounded-full flex items-center justify-center mb-4">
					<RiCheckLine className="text-white w-6 h-6" />
				</div>

				<h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
				<p className="text-sm text-center text-gray-600 mb-4">{content}</p>

				<button
					onClick={onClose}
					className="mt-4 px-6 py-2 bg-black text-white rounded-md "
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default SuccessModal;
