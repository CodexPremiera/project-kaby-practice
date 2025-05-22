"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsDot, BsFillEyeFill, BsFillHandThumbsUpFill } from "react-icons/bs";
import { ImageGalleryModal } from "./ImageGalleryModal";
import ManagePostMenu from "./ManagePostMenu";
import ErrorModal from "@/components/modal/ErrorModal";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import PostActions from "./PostActions";
import SuccessModal from "@/components/modal/SuccessModal";

// Update post
async function updatePost(postId: string, data: any) {
	const res = await fetch(`/api/post/${postId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.error || "Failed to update post");
	}

	return res.json();
}

// Delete post
async function deletePost(postId: string) {
	const res = await fetch(`/api/post/${postId}`, {
		method: "DELETE",
		credentials: "include",
	});
	return res.json();
}

interface PostCardProps {
	postId: string;
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
	postId,
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
	const [modalType, setModalType] = useState<
		"none" | "confirmation" | "success" | "error"
	>("none");

	const openModal = (index: number) => {
		setModalIndex(index);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	// Moved inside component to have access to setModalType and postId
	const handleManageAction = async (action: string, postId: string) => {
		try {
			switch (action) {
				case "Pin":
					await updatePost(postId, { is_pinned: true });
					console.log("Pinned the post!");
					break;
				case "Edit":
					console.log("Edit post!");
					break;
				case "Delete":
					setModalType("confirmation");
					break;
				default:
					break;
			}
		} catch (error) {
			console.error("Action error:", error);
		}
	};

	const confirmDelete = async () => {
		try {
			await deletePost(postId);
			setModalType("success");
		} catch (error: any) {
			setModalType("error");
		}
	};

	const cancelDelete = () => {
		setModalType("none");
	};

	return (
		<div className="relative flex flex-col px-4 pt-4 pb-5 gap-4 rounded-xl border border-light-color background-1 transition ">
			{/* Confirmation Modal */}
			{modalType === "confirmation" && (
				<ConfirmationModal
					title="Delete This Post?"
					content="Are you sure you want to delete this post?"
					onConfirm={confirmDelete}
					onClose={cancelDelete}
				/>
			)}

			{/* Success Modal*/}
			{modalType === "success" && (
				<SuccessModal
					title="Post Deleted"
					content="The post was deleted successfully."
					onClose={() => setModalType("none")}
				/>
			)}
			{/* Error modal */}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content="Failed to delete post."
					onClose={() => setModalType("none")}
				/>
			)}

			{/* Header */}
			<div className="flex gap-3 items-start justify-between">
				<div className="flex gap-3">
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
				</div>
				<ManagePostMenu
					onAction={(action) => handleManageAction(action, postId)}
				/>
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
								key={url}
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

			{/* Image gallery modal */}
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
