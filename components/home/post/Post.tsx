import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import SwitchTab from "@/components/ui/tabs/SwitchTab";
import MonthlyBadges from "./MonthlyBadges";
import PostComposerForm from "./PostComposerForm";
import { getPublicUrl } from "@/utils/supabase/storage";
import { timeAgo } from "@/utils/timeAgo";
import LoadingModal from "@/components/modal/LoadingModal";

type UserProps = {
	userRole: string;
};
type PostType = {
	id: string;
	owner: string;
	content: string;
	media: string | null;
	no_of_likes: number;
	no_of_views: number;
	time_uploaded: string;
	is_pinned: boolean;
};
type BarangayProfile = {
	user_id: string;
	barangayName: string;
	address: string;
	profile_pic: string;
};

type PostWithProfile = PostType & {
	profile: BarangayProfile | null;
};

const Post: React.FC<UserProps> = ({ userRole }) => {
	const [activeTab, setActiveTab] = useState<"all" | "pinned">("all");
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState<PostWithProfile[]>([]);

	const fetchPostsAndProfiles = async () => {
		setLoading(true);
		try {
			// Sa api nako gikuha kinsa current naka login (api/post)
			const res = await fetch("/api/post");
			const postData: PostType[] = await res.json();

			// Since Post owner only returns an id (not all the details: owner's name, address, pic), I used the (api/barangay) to get access to its details given the id
			const resProfiles = await fetch("/api/barangay");
			const profilesJson = await resProfiles.json();
			const barangayProfiles: BarangayProfile[] = profilesJson.data || [];

			const postsWithProfiles: PostWithProfile[] = postData.map((post) => {
				const profile = barangayProfiles.find((b) => b.user_id === post.owner);
				return { ...post, profile: profile || null };
			});

			const sortedPosts = postsWithProfiles.sort(
				(a, b) =>
					new Date(b.time_uploaded).getTime() -
					new Date(a.time_uploaded).getTime()
			);

			setPosts(sortedPosts);
		} catch (err) {
			console.error("Error fetching posts or profiles:", err);
			setPosts([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPostsAndProfiles();
	}, []);

	// Filter posts depending on tab
	const postsToDisplay =
		activeTab === "all" ? posts : posts.filter((post) => post.is_pinned);

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
					{userRole === "barangay" && <PostComposerForm />}
					<div className="flex flex-col gap-4">
						{loading ? (
							<div>
								<LoadingModal title="Loading Posts" content="Please wait..." />
							</div>
						) : postsToDisplay.length === 0 ? (
							<p>No posts to display.</p>
						) : (
							postsToDisplay.map((post) => {
								// Parse media JSON string to array
								const mediaArray: string[] = post.media
									? JSON.parse(post.media)
									: [];

								// Build full public URLs to images stored in 'post-pictures/uploads'
								const fullImageUrls = mediaArray.map((filePath) =>
									getPublicUrl(filePath, "post-pictures")
								);

								return (
									<PostCard
										postId={post.id}
										avatarUrl={
											post.profile?.profile_pic
												? getPublicUrl(
														post.profile.profile_pic,
														"profile-pictures"
													)
												: "/assets/default-profile.jpg"
										}
										username={post.profile?.barangayName || "Unknown User"}
										handle={post.profile?.address || "Unknown Address"}
										postText={post.content}
										imageUrls={fullImageUrls}
										likes={post.no_of_likes ?? 0}
										views={post.no_of_views ?? 0}
										timeAgo={timeAgo(post.time_uploaded)}
										isPinned={post.is_pinned}
										userRole={userRole}
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
				{userRole === "barangay" && <PostComposerForm />}
				<div className="flex flex-col gap-4">
					{loading ? (
						<div>
							<LoadingModal title="Loading Posts" content="Please wait..." />
						</div>
					) : postsToDisplay.length === 0 ? (
						<p>No posts to display.</p>
					) : (
						postsToDisplay.map((post) => {
							const mediaArray: string[] = post.media
								? JSON.parse(post.media)
								: [];

							const fullImageUrls = mediaArray.map((filePath) =>
								getPublicUrl(filePath, "post-pictures")
							);

							return (
								<PostCard
									postId={post.id}
									avatarUrl={
										post.profile?.profile_pic
											? getPublicUrl(
													post.profile.profile_pic,
													"profile-pictures"
												)
											: "/assets/default-profile.jpg"
									}
									username={post.profile?.barangayName || "Unknown User"}
									handle={post.profile?.address || "Unknown Address"}
									postText={post.content}
									imageUrls={fullImageUrls}
									likes={post.no_of_likes ?? 0}
									views={post.no_of_views ?? 0}
									timeAgo={timeAgo(post.time_uploaded)}
									isPinned={post.is_pinned}
									userRole={userRole}
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
