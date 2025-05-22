"use client";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const usePostComposer = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [form, setForm] = useState({
		content: "",
		files: [] as File[],
		previewUrls: [] as string[],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [modalType, setModalType] = useState<
		"loading" | "success" | "error" | null
	>(null);

	const handleCloseModal = () => setModalType(null);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, content: e.target.value }));
	};

	const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
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

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const mediaPaths: string[] = [];

			for (const file of form.files) {
				const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
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
				setModalType("loading");
				setForm({ content: "", files: [], previewUrls: [] });
				if (fileInputRef.current) fileInputRef.current.value = "";

				// Show loading modal for 3 seconds then show success modal
				setTimeout(() => {
					setModalType("success");

					// Then after 1.5 seconds, refresh the page
					setTimeout(() => {
						window.location.reload();
					}, 1500);
				}, 3000);
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

	return {
		form,
		isSubmitting,
		modalType,
		fileInputRef,
		handleChange,
		handleFileSelect,
		handleRemoveImage,
		handleSubmit,
		handleCloseModal,
	};
};
