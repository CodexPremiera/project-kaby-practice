import React from "react";
import { RiCloseFill } from "react-icons/ri";

interface ConfirmationModalProps {
	title: string;
	content: string;
	onConfirm: () => void;
	onClose: () => void;
}

const ConfirmationModal = ({
	title,
	content,
	onConfirm,
	onClose,
}: ConfirmationModalProps) => {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
			<button
				onClick={onClose}
				className="absolute top-5 right-5 text-white hover:text-black text-3xl z-50"
			>
				<RiCloseFill className="w-[25px] h-[25px]" />
			</button>

			<div className="relative flex flex-col items-center bg-white p-8 py-10 gap-2 rounded-lg shadow-lg w-[400px]">
				<h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
				<div className="text-sm text-gray-600 text-center mb-6 break-words">
					{content}
				</div>

				<div className="flex gap-4 w-full">
					<button
						onClick={onConfirm}
						className="flex-1 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition"
					>
						Yes
					</button>
					<button
						onClick={onClose}
						className="flex-1 py-2 rounded-lg bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
