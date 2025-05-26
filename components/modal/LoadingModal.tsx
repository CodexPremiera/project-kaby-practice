import React from "react";
import { RiCheckLine } from "react-icons/ri";

type LoadingModalProps = {
	title: string;
	content: string;
};

export default function LoadingModal({ title, content }: LoadingModalProps) {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 ">
			<div className="relative flex flex-col items-center bg-white h-60 p-8 py-12 rounded-lg shadow-lg w-[350px] justify-center">
				<div className="relative flex items-center justify-center gap-3">
					<div className="h-5 w-5 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
					<div className="h-5 w-5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
					<div className="h-5 w-5 bg-secondary rounded-full animate-bounce"></div>
				</div>

				<h2 className="text-xl font-semibold text-center mt-6">{title}</h2>
				<p className="text-sm text-center text-gray-600 mt-2">{content}</p>
			</div>
		</div>
	);
}
