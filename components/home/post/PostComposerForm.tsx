"use client";
import React, { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { RiCloseCircleLine, RiImageLine } from "react-icons/ri";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import ErrorModal from "@/components/modal/ErrorModal";
import SuccessModal from "@/components/modal/SuccessModal";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PostComposerForm = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [form, setForm] = useState({
		content: "",
		files: [] as File[],
		previewUrls: [] as string[],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [modalType, setModalType] = useState<"success" | "error" | null>(null);

	const handleCloseModal = () => setModalType(null);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, content: e.target.value }));
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files ?? []);
		const totalFiles = form.files.length + selectedFiles.length;

		if (totalFiles > 5) {
			alert("You can only upload up to 5 pictures.");
			return;
		}

		const newPreviewUrls = selectedFiles.map((file) =>
			URL.createObjectURL(file)
		);

		setForm((prev) => ({
			...prev,
			files: [...prev.files, ...selectedFiles],
			previewUrls: [...prev.previewUrls, ...newPreviewUrls],
		}));

		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleRemoveImage = (index: number) => {
		const newFiles = [...form.files];
		const newPreviewUrls = [...form.previewUrls];
		newFiles.splice(index, 1);
		newPreviewUrls.splice(index, 1);
		setForm((prev) => ({
			...prev,
			files: newFiles,
			previewUrls: newPreviewUrls,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const mediaPaths: string[] = [];

			for (const file of form.files) {
				const uniqueName = `${Date.now()}-${file.name
					.replace(/\s+/g, "-")
					.toLowerCase()}`;
				const { data, error } = await supabase.storage
					.from("post-pictures")
					.upload(`uploads/${uniqueName}`, file, {
						cacheControl: "3600",
						upsert: false,
					});

				if (error) {
					console.error("Upload Error:", error.message);
					setModalType("error");
					setIsSubmitting(false);
					return;
				}

				mediaPaths.push(data.path);
			}

			const payload = {
				content: form.content,
				media: mediaPaths,
				time_uploaded: new Date().toISOString(),
			};

			const res = await fetch("/api/post", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (res.ok) {
				setModalType("success");
				setForm({ content: "", files: [], previewUrls: [] });
				if (fileInputRef.current) fileInputRef.current.value = "";
			} else {
				console.error("Failed to create post:", await res.json());
				setModalType("error");
			}
		} catch (error) {
			console.error("Submit Error:", error);
			setModalType("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full">
			{/* Success Modal */}
			{modalType === "success" && (
				<SuccessModal
					title="Success!"
					content="Your post has been created."
					onClose={handleCloseModal}
				/>
			)}

			{/* Error Modal */}
			{modalType === "error" && (
				<ErrorModal
					title="Oops!"
					content="Something went wrong. Please try again."
					onClose={handleCloseModal}
				/>
			)}

			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-start gap-4 px-4 py-3 background-1 sm:rounded-xl border border-light-color"
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

						{/* Last preview image with overlay if more than 3 images */}
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
						{isSubmitting ? "Posting..." : "Post"}
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
