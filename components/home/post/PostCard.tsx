"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
	BsDot,
	BsFillEyeFill,
	BsFillHandThumbsUpFill,
	BsPencilSquare,
	BsPinAngle,
	BsThreeDots,
	BsTrash,
} from "react-icons/bs";
import { ImageGalleryModal } from "./ImageGalleryModal";

const MANAGE_POST = [
	{ title: "Pin", icon: BsPinAngle },
	{ title: "Edit", icon: BsPencilSquare },
	{ title: "Delete", icon: BsTrash },
];

const PostMenu = () => (
	<div className="relative ml-auto">
		<div
			tabIndex={0}
			className="peer p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full cursor-pointer transition"
		>
			<BsThreeDots className="text-primary peer-focus:text-blue-500" />
		</div>

		<div
			className="absolute right-0 mt-2 w-40 background-1 rounded-xl shadow-lg
        opacity-0 pointer-events-none
        peer-focus-within:opacity-100 peer-focus-within:pointer-events-auto
        focus-within:opacity-100 focus-within:pointer-events-auto
        transition-opacity duration-200"
		>
			{MANAGE_POST.map(({ title, icon: Icon }) => (
				<div
					key={title}
					className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 text-sm cursor-pointer transition"
				>
					<Icon size={18} />
					<span>{title}</span>
				</div>
			))}
		</div>
	</div>
);

const PostActions = ({ likes, views }: { likes: number; views: number }) => (
	<div className="flex justify-between text-secondary mt-3 px-1 w-full">
		<div className="flex items-center space-x-2 hover:text-secondary cursor-pointer transition">
			<BsFillHandThumbsUpFill />
			<span>{likes}</span>
		</div>
		<div className="flex items-center space-x-2 hover:text-secondary cursor-pointer transition">
			<BsFillEyeFill />
			<span>{views}</span>
		</div>
	</div>
);

interface PostCardProps {
	avatarUrl?: string;
	username?: string;
	handle?: string;
	postText?: string;
	imageUrls?: string[];
	likes?: number;
	views?: number;
	timeAgo?: string;
}

const PostCard: React.FC<PostCardProps> = ({
	avatarUrl = "/assets/default-profile.jpg",
	username = "Unknown User",
	handle = "unknown",
	postText = "",
	imageUrls = [],
	likes = 0,
	views = 0,
	timeAgo = "",
}) => {
	const validImageUrls = imageUrls.filter((url) => url && url.trim() !== "");
	const captions = validImageUrls.map(() => postText);
	const likesArray = validImageUrls.map(() => likes);
	const viewsArray = validImageUrls.map(() => views);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalIndex, setModalIndex] = useState(0);

	const openModal = (index: number) => {
		setModalIndex(index);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<div className="relative flex flex-col px-4 pt-4 pb-5 gap-4 rounded-xl border border-light-color background-1 transition">
			{/* Header */}
			<div className="flex gap-3 items-center">
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
					<div className="flex items-center">
						<span className="font-semibold">{username}</span>
						<BsDot />
						<span>{timeAgo}</span>
					</div>
					<span className="text-secondary text-sm leading-3">@{handle}</span>
				</div>
				<PostMenu />
			</div>

			{/* Body */}
			<div className="flex flex-col flex-1 text-sm">
				<div className="text-primary mt-1 whitespace-pre-line">{postText}</div>

				{/* Images */}
				{validImageUrls.length === 1 && (
					<div
						className="relative mt-3 w-full rounded-2xl overflow-hidden cursor-pointer"
						style={{ aspectRatio: "16 / 9" }}
						onClick={() => openModal(0)}
					>
						<Image
							src={validImageUrls[0]}
							alt="Post Image"
							fill
							className="object-cover"
						/>
					</div>
				)}

				{validImageUrls.length > 1 && (
					<div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
						{validImageUrls.slice(0, 2).map((url, i) => (
							<div
								key={i}
								className="relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer"
								onClick={() => openModal(i)}
							>
								<Image
									src={url}
									alt={`Post Image ${i + 1}`}
									fill
									className="object-cover"
								/>
								{i === 1 && validImageUrls.length > 2 && (
									<div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-semibold rounded-lg">
										+{validImageUrls.length - 2}
									</div>
								)}
							</div>
						))}
					</div>
				)}

				<PostActions likes={likes} views={views} />
			</div>

			{/* Modal */}
			{modalOpen && (
				<ImageGalleryModal
					images={validImageUrls}
					captions={captions}
					likes={likesArray}
					views={viewsArray}
					initialIndex={modalIndex}
					onClose={closeModal}
					avatarUrl={avatarUrl}
					username={username}
					handle={handle}
					timeAgo={timeAgo}
				/>
			)}
		</div>
	);
};

export default PostCard;
