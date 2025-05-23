import React from "react";
import { RiCloseFill } from "react-icons/ri";

interface ConfirmationModalProps {
	title: string;
	content: string;
	onConfirm: () => void; // called when user clicks Yes
	onClose: () => void; // called when user clicks No or closes modal
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

			<div className="relative flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-[350px]">
				<h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
				<p className="text-sm text-center text-gray-600 mb-4">{content}</p>

				<div className="flex gap-3">
					<button
						onClick={onConfirm}
						className="mt-4 px-6 py-2 bg-black text-white rounded-md"
					>
						Yes
					</button>
					<button
						onClick={onClose}
						className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-md"
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
