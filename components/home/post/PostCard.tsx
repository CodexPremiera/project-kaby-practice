import React, { useState } from "react";
import {
	BsDot,
	BsFillEyeFill,
	BsFillHandThumbsUpFill,
	BsPencilSquare,
	BsPinAngle,
	BsThreeDots,
	BsTrash,
} from "react-icons/bs";
import Image from "next/image";

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
		<div className="relative flex px-4 py-3 space-x-4 bg-white transition">
			{/* Avatar */}
			<div>
				<div className="w-10 h-10 shrink-0">
					<Image
						src={avatarUrl}
						alt="User Avatar"
						width={360}
						height={360}
						className="object-cover w-full h-full rounded-full"
					/>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col flex-1">
				{/* Header */}
				<div className="flex justify-between items-center">
					<div className="flex items-center text-gray space-x-1">
						<span className="font-bold text-black">{username}</span>
						<span>@{handle}</span>
						<BsDot />
						<span>{timeAgo}</span>
					</div>

					{/* 3-dot menu */}
					<div className="relative">
						<div
							className="peer p-2 hover:bg-white/10 rounded-full cursor-pointer transition"
							tabIndex={0}
						>
							<BsThreeDots className="text-gray-400 peer-focus:text-blue-500" />
						</div>

						<div
							className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg  
								opacity-0 pointer-events-none 
								peer-focus-within:opacity-100 peer-focus-within:pointer-events-auto 
								focus-within:opacity-100 focus-within:pointer-events-auto 
								transition-opacity duration-200"
						>
							{MANAGE_POST.map((item) => {
								const Icon = item.icon;
								return (
									<div
										key={item.title}
										className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 text-black text-sm transition cursor-pointer"
									>
										<Icon size={18} />
										<span>{item.title}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Post Text */}
				<div className="text-black mt-1">{postText}</div>

				{/* Optional Image */}
				{imageUrl && (
					<div className="mt-3 rounded-2xl overflow-hidden">
						<Image
							src={imageUrl}
							alt="Post Image"
							width={360}
							height={360}
							className="object-cover w-full h-full"
						/>
					</div>
				)}

				{/* Actions (Likes and Views) */}
				<div className="flex justify-between text-gray-500 mt-3 max-w-md">
					{/* Likes */}
					<div className="flex items-center space-x-2 hover:text-secondary cursor-pointer transition">
						<BsFillHandThumbsUpFill />
						<span>{likes}</span>
					</div>
					{/* Views */}
					<div className="flex items-center space-x-2 hover:text-secondary cursor-pointer transition">
						<BsFillEyeFill />
						<span>{views}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
