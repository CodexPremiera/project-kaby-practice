import React from "react";
import Image from "next/image";

const PostComposer = () => {
	return (
		<div className="flex items-start gap-4 px-4 py-3 bg-white card-custom">
			<div className="w-10 h-10 shrink-0">
				<Image
					src="/assets/img/profile/bg-profile.png"
					alt="User Avatar"
					width={360}
					height={360}
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="flex flex-col flex-1">
				<textarea
					rows={2}
					className="w-full bg-transparent text-black placeholder:text-gray-400 resize-none outline-none pt-2"
					placeholder="What's happening?"
				/>

				<div className="flex justify-end mt-3">
					<button className="bg-secondary hover:bg-secondary/80 text-white font-medium py-2 px-5 rounded-full text-sm transition-colors duration-200">
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostComposer;
