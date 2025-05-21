import React, { useState, useEffect } from "react";
import PostComposer from "./PostComposerForm";
import PostCard from "./PostCard";
import SwitchTab from "@/components/ui/tabs/SwitchTab";
import MonthlyBadges from "./MonthlyBadges";

type UserProps = {
	userId: string;
	userRole: string;
};

// Helper function to convert timestamp to "time ago" string
function timeAgo(dateString: string) {
	const date = new Date(dateString);
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (seconds < 60) return "just now";
	if (seconds < 3600) {
		const mins = Math.floor(seconds / 60);
		return mins === 1 ? "1 minute ago" : `${mins} minutes ago`;
	}
	if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
	}
	if (seconds < 604800) {
		const days = Math.floor(seconds / 86400);
		return days === 1 ? "1 day ago" : `${days} days ago`;
	}
	return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const Post: React.FC<UserProps> = ({ userId, userRole }) => {
	const [activeTab, setActiveTab] = useState<"all" | "pinned">("all");
	const [posts, setPosts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const SUPABASE_URL =
		"https://jevvtrbqagijbkdjoveh.supabase.co/storage/v1/object/public";

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/post");
				const data = await res.json();
				setPosts(data);
			} catch (err) {
				console.error("Error fetching posts:", err);
				setPosts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	// Filter posts depending on tab
	const postsToDisplay =
		activeTab === "all"
			? posts
			: posts.filter((post) => post.is_pinned === true);

	return (
		<div className="w-full px-6">
			{/* Tabs */}
			<div className="flex justify-between items-center gap-4 md:hidden">
				<div className="flex gap-4">
					<SwitchTab
						active={activeTab === "all"}
						onClick={() => setActiveTab("all")}
						className="w-fit cursor-pointer"
					>
						All Posts
					</SwitchTab>
					<SwitchTab
						active={activeTab === "pinned"}
						onClick={() => setActiveTab("pinned")}
						className="w-fit cursor-pointer"
					>
						Pinned
					</SwitchTab>
				</div>
				<MonthlyBadges />
			</div>

			{/* Large screen layout */}
			<div className="hidden md:flex gap-6 justify-between">
				<div className="md:w-1/6 flex flex-col gap-8 sm:py-4">
					<SwitchTab
						active={activeTab === "all"}
						onClick={() => setActiveTab("all")}
						className="w-fit cursor-pointer"
					>
						All Posts
					</SwitchTab>
					<SwitchTab
						active={activeTab === "pinned"}
						onClick={() => setActiveTab("pinned")}
						className="w-fit cursor-pointer"
					>
						Pinned
					</SwitchTab>
				</div>

				<div className="md:w-1/2 max-w-3xl flex flex-col gap-6">
					{userRole === "barangay" && <PostComposer />}
					<div className="flex flex-col gap-4">
						{loading ? (
							<p>Loading posts...</p>
						) : postsToDisplay.length === 0 ? (
							<p>No posts to display.</p>
						) : (
							postsToDisplay.map((post) => {
								// Parse media JSON string to array
								const mediaArray: string[] = post.media
									? JSON.parse(post.media)
									: [];

								// Build full public URLs to images stored in 'post-pictures/uploads'
								const fullImageUrls = mediaArray.map(
									(filePath) => `${SUPABASE_URL}/post-pictures/${filePath}`
								);

								return (
									<PostCard
										key={post.id}
										username={post.owner}
										postText={post.content}
										imageUrls={fullImageUrls}
										likes={post.no_of_likes ?? 0}
										views={post.no_of_views ?? 0}
										timeAgo={timeAgo(post.time_uploaded)}
									/>
								);
							})
						)}
					</div>
				</div>

				<div className="md:w-1/4">
					<MonthlyBadges />
				</div>
			</div>

			{/* Small screen posts */}
			<div className="md:hidden mt-4">
				{userRole === "barangay" && <PostComposer />}
				<div className="flex flex-col gap-4">
					{loading ? (
						<p>Loading posts...</p>
					) : postsToDisplay.length === 0 ? (
						<p>No posts to display.</p>
					) : (
						postsToDisplay.map((post) => {
							const mediaArray: string[] = post.media
								? JSON.parse(post.media)
								: [];

							const fullImageUrls = mediaArray.map(
								(filePath) => `${SUPABASE_URL}/post-pictures/${filePath}`
							);

							return (
								<PostCard
									key={post.id}
									username={post.owner}
									postText={post.content}
									imageUrls={fullImageUrls}
									likes={post.no_of_likes ?? 0}
									views={post.no_of_views ?? 0}
									timeAgo={timeAgo(post.time_uploaded)}
								/>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default Post;
