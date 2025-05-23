import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillHandThumbsUpFill } from "react-icons/bs";

interface PostActionsProps {
	postId: string;
	initialLikes: number;
	initialViews: number;
}

const PostActions = ({
	postId,
	initialLikes,
	initialViews,
}: PostActionsProps) => {
	const [likes, setLikes] = useState(initialLikes);
	const [views, setViews] = useState(initialViews);
	const [likedByUser, setLikedByUser] = useState(false);

	// Check if post was already liked by this user
	useEffect(() => {
		const likedPosts = JSON.parse(localStorage.getItem("liked-posts") || "[]");
		if (likedPosts.includes(postId)) {
			setLikedByUser(true);
		}
	}, [postId]);

	// Increment view count immediately on mount
	useEffect(() => {
		setViews((v) => v + 1);

		fetch(`/api/post/${postId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ no_of_views: initialViews + 1 }),
		}).catch((err) => console.error("Failed to increment views", err));
	}, [postId, initialViews]);

	// Toggle like
	const toggleLike = () => {
		const likedPosts = JSON.parse(localStorage.getItem("liked-posts") || "[]");
		let newLikes = likes;

		if (likedByUser) {
			newLikes = likes - 1;
			const updatedLikedPosts = likedPosts.filter(
				(id: string) => id !== postId
			);
			localStorage.setItem("liked-posts", JSON.stringify(updatedLikedPosts));
			setLikedByUser(false);
		} else {
			newLikes = likes + 1;
			likedPosts.push(postId);
			localStorage.setItem("liked-posts", JSON.stringify(likedPosts));
			setLikedByUser(true);
		}

		setLikes(newLikes);

		fetch(`/api/post/${postId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ no_of_likes: newLikes }),
		}).catch((err) => console.error("Failed to toggle like", err));
	};

	return (
		<div className="flex justify-between text-secondary mt-3 px-1 w-full">
			<div
				onClick={toggleLike}
				className={`flex items-center space-x-2 cursor-pointer transition ${
					likedByUser ? "text-blue-500" : "hover:text-secondary"
				}`}
			>
				<BsFillHandThumbsUpFill />
				<span>{likes}</span>
			</div>
			<div className="flex items-center space-x-2 text-secondary">
				<BsFillEyeFill />
				<span>{views}</span>
			</div>
		</div>
	);
};

export default PostActions;
