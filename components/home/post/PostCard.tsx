import React from "react";
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

// Menu config
const MANAGE_POST = [
	{ title: "Pin", icon: BsPinAngle },
	{ title: "Edit", icon: BsPencilSquare },
	{ title: "Delete", icon: BsTrash },
];

interface PostCardProps {
	avatarUrl: string;
	username: string;
	handle: string;
	timeAgo: string;
	postText: string;
	imageUrl?: string;
	likes: number;
	views: number;
}

// Dropdown menu component
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

// Action bar component
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

const PostCard = ({
										avatarUrl,
										username,
										handle,
										timeAgo,
										postText,
										imageUrl,
										likes,
										views,
									}: PostCardProps) => {
	return (
		<div className="relative flex flex-col px-4 pt-4 pb-5 gap-4 sm:rounded-xl border border-light-color background-1 transition">

			{/* Header */}
			<div className="flex gap-3 items-center">
				<div className="w-10 h-10 shrink-0">
					<Image
						src={avatarUrl}
						alt="User Avatar"
						width={360}
						height={360}
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
				<div className="text-primary mt-1">{postText}</div>

				{imageUrl && (
					<div className="mt-3 rounded-2xl overflow-hidden">
						<Image
							src={imageUrl}
							alt="Post Image"
							width={400}
							height={400}
							className="object-cover w-full h-full"
						/>
					</div>
				)}

				<PostActions likes={likes} views={views} />
			</div>
		</div>
	);
};

export default PostCard;