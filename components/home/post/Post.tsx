import React from "react";
import PostComposer from "./PostComposer";
import PostCard from "./PostCard";

const postsData = [
	{
		avatarUrl: "/assets/img/profile/bg-profile.png",
		username: "Labangon",
		handle: "labangoncebu",
		timeAgo: "1h",
		postText:
			"Just launched a new project! 🚀 Check it out and let us know what you think. #webdev #nextjs #buildinpublic",
		imageUrl: "/assets/img/service-img.png",
		likes: 64,
		views: 1200,
	},
	{
		avatarUrl: "/assets/img/profile/bg-profile.png",
		username: "Labangon",
		handle: "labangoncebu",
		timeAgo: "1h",
		postText:
			"Just launched a new project! 🚀 Check it out and let us know what you think. #webdev #nextjs #buildinpublic",
		imageUrl: "/assets/img/service-img.png",
		likes: 64,
		views: 1200,
	},
];

const Post = () => {
	return (
		<main className="ml-[0px] md:ml-[255px] w-auto md:w-[500px] min-h-screen flex flex-col pb-20">
			<PostComposer />

			{/* Timeline */}
			<div className="flex flex-col gap-4 py-4">
				{postsData.map((post, index) => (
					<PostCard key={index} {...post} />
				))}
			</div>
		</main>
	);
};

export default Post;
