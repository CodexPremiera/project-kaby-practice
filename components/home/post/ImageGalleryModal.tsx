"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BsDot, BsFillHandThumbsUpFill, BsFillEyeFill } from "react-icons/bs";
import { ImageGalleryController } from "./ImageGalleryController";

interface ImageGalleryModalProps {
	images: string[];
	captions?: string[];
	likes?: number[];
	views?: number[];
	initialIndex?: number;
	onClose: () => void;
	avatarUrl: string;
	username: string;
	handle: string;
	timeAgo: string;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
	images,
	captions = [],
	likes = [],
	views = [],
	initialIndex = 0,
	onClose,
	avatarUrl,
	username,
	handle,
	timeAgo,
}) => {
	const [gallery] = useState(
		() => new ImageGalleryController(images, captions, likes, views)
	);
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		gallery.setCurrentIndex(initialIndex);
		setCurrentIndex(initialIndex);
	}, [initialIndex, gallery]);

	const nextImage = () => {
		gallery.next();
		setCurrentIndex(gallery.getCurrentIndex());
	};

	const prevImage = () => {
		gallery.prev();
		setCurrentIndex(gallery.getCurrentIndex());
	};

	useEffect(() => {
		if (modalRef.current) {
			modalRef.current.focus();
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Escape") onClose();
				if (e.key === "ArrowRight") nextImage();
				if (e.key === "ArrowLeft") prevImage();
			}}
			tabIndex={0}
			role="dialog"
			aria-modal="true"
			ref={modalRef}
		>
			<div
				className="flex sm:flex-row flex-col max-w-6xl sm:max-h-[90vh] h-[95vh] rounded-lg shadow-lg overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Left: Image + navigation */}
				<div className="relative w-full sm:w-[60vw] max-w-[800px] flex items-center justify-center bg-black">
					{gallery.getTotalImages() > 1 && (
						<div
							onClick={prevImage}
							className="absolute left-4 text-white text-lg cursor-pointer select-none z-20 hover:text-gray-300 transition"
							aria-label="Previous image"
						>
							◀
						</div>
					)}

					<Image
						src={gallery.getCurrentImage()}
						alt={`Image ${currentIndex + 1}`}
						width={800}
						height={600}
						className="object-contain max-w-full max-h-full"
						priority
					/>

					{gallery.getTotalImages() > 1 && (
						<div
							onClick={nextImage}
							className="absolute right-4 text-white text-lg cursor-pointer select-none z-20 hover:text-gray-300 transition"
							aria-label="Next image"
						>
							▶
						</div>
					)}

					<div
						role="button"
						tabIndex={0}
						onClick={onClose}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") onClose();
						}}
						aria-label="Close gallery"
						className="absolute top-0 right-4 cursor-pointer text-white text-3xl select-none"
					>
						×
					</div>
				</div>

				{/* Right: Details — hidden on mobile */}
				<div className="hidden sm:flex w-[40vw] max-w-[400px] p-6 overflow-y-auto border-l border-gray-300 flex-col justify-between bg-white">
					{/* Header */}
					<div className="flex items-center gap-3 border-b border-gray-300 pb-4 mb-4">
						<div className="w-10 h-10 shrink-0">
							<Image
								src={avatarUrl}
								alt="User Avatar"
								width={40}
								height={40}
								className="object-cover w-full h-full rounded-full"
							/>
						</div>
						<div className="flex flex-col">
							<div className="flex items-center gap-2">
								<span className="font-semibold">{username}</span>
								<BsDot />
								<span className="text-sm text-secondary">{timeAgo}</span>
							</div>
							<span className="text-secondary text-sm leading-3">
								@{handle}
							</span>
						</div>
					</div>

					{/* Caption */}
					<p className="text-gray-900 whitespace-pre-wrap mb-4 justify-start">
						{gallery.getCurrentCaption()}
					</p>

					{/* Likes & Views */}
					<div className="flex gap-6 text-secondary text-sm pt-4 border-t border-gray-300 bottom-0 justify-between">
						<div className="flex items-center gap-1">
							<BsFillHandThumbsUpFill />
							<span>{gallery.getCurrentLikes()}</span>
						</div>
						<div className="flex items-center gap-1">
							<BsFillEyeFill />
							<span>{gallery.getCurrentViews()}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
