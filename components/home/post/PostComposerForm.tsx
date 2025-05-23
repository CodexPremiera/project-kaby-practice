"use client";
import React from "react";
import { RiCloseCircleLine, RiImageLine } from "react-icons/ri";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import ErrorModal from "@/components/modal/ErrorModal";
import { usePostComposer } from "@/hooks/usePostComposer";
import LoadingModal from "@/components/modal/LoadingModal";
import SuccessModal from "@/components/modal/SuccessModal";

const PostComposerForm = () => {
	const {
		form,
		isSubmitting,
		modalType,
		fileInputRef,
		handleChange,
		handleFileSelect,
		handleRemoveImage,
		handleSubmit,
		handleCloseModal,
	} = usePostComposer();

	return (
		<div className="w-full">
			{modalType === "loading" && (
				<LoadingModal title="Processing" content="Publishing your post" />
			)}
			{modalType === "success" && (
				<SuccessModal
					title="Success!"
					content="Your post has been created."
					onClose={handleCloseModal}
				/>
			)}

			{modalType === "error" && (
				<ErrorModal
					title="Oops!"
					content="Something went wrong. Please try again."
					onClose={handleCloseModal}
				/>
			)}

			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-start gap-4 px-4 py-3 background-1 rounded-xl border border-light-color"
			>
				<textarea
					rows={2}
					id="content"
					name="content"
					onChange={handleChange}
					value={form.content}
					className="w-full bg-transparent text-black rounded-lg px-1 py-2 placeholder:text-gray-400 resize-none outline-none text-sm"
					placeholder="What's happening?"
					required
				/>

				{form.previewUrls.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-2">
						{form.previewUrls.slice(0, 2).map((url, index) => (
							<div key={index} className="relative">
								<img
									src={url}
									alt={`Preview ${index}`}
									className="rounded-lg max-h-40 object-cover"
								/>
								<button
									type="button"
									onClick={() => handleRemoveImage(index)}
									className="absolute top-1 right-1 p-1 bg-opacity-60 rounded-full"
								>
									<RiCloseCircleLine className="w-5 h-5 text-white" />
								</button>
							</div>
						))}

						{form.previewUrls.length > 2 && (
							<div className="relative">
								<img
									src={form.previewUrls[2]}
									alt="Preview 3"
									className="rounded-lg max-h-40 object-cover brightness-55"
								/>
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-white text-xl font-bold">
										+{form.previewUrls.length - 2}
									</span>
								</div>
								<button
									type="button"
									onClick={() => handleRemoveImage(2)}
									className="absolute top-1 right-1 p-1 bg-opacity-60 rounded-full"
								>
									<RiCloseCircleLine className="w-5 h-5 text-white" />
								</button>
							</div>
						)}
					</div>
				)}

				<div className="flex justify-between items-center w-full">
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="p-2 rounded-full hover:bg-gray-200 transition"
							title="Add Photo"
						>
							<RiImageLine className="w-5 h-5 text-gray-600" />
						</button>
					</div>

					<ButtonPrimary type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Posting" : "Post"}
					</ButtonPrimary>
				</div>

				<input
					type="file"
					id="file_upload"
					name="file_upload"
					accept="image/*"
					multiple
					onChange={handleFileSelect}
					ref={fileInputRef}
					className="hidden"
				/>
			</form>
		</div>
	);
};

export default PostComposerForm;
