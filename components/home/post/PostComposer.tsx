import React from "react";
import Image from "next/image";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";

const PostComposer = () => {
	return (
		<div className="flex w-full items-start gap-4 px-4 py-3 background-1 sm:rounded-xl border border-light-color">
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
					className="w-full bg-transparent text-black placeholder:text-gray-400 resize-none outline-none pt-2 text-sm"
					placeholder="What's happening?"
				/>

				<div className="flex justify-end mt-3">
					<ButtonPrimary>Post</ButtonPrimary>
				</div>
			</div>
		</div>
	);
};

export default PostComposer;