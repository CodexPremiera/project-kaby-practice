"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/modal/ErrorModal";
import LoadingModal from "@/components/modal/LoadingModal";
import ButtonPrimary from '@/components/ui/buttons/ButtonPrimary';

export default function LoginClientForm() {
	const router = useRouter();

	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	const [modalType, setModalType] = useState(null);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCloseModal = () => {
		setModalType(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (res.ok) {
				const data = await res.json();
				setModalType("loading");

				// Redirect after short delay while showing loading state
				setTimeout(() => {
					router.push(data.redirectTo);
				}, 1500);
			} else {
				setModalType("error");
			}
		} catch (err) {
			setModalType("error");
			console.error("Error logging in:", err);
		}
	};

	return (
		<div>
			{/* Loading Modal */}
			{modalType === "loading" && (
				<LoadingModal title="Success" content="Logging you in..." />
			)}

			{/* Error Modal */}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content="Login failed. Please check your credentials."
					onClose={handleCloseModal}
				/>
			)}

			{/* Login Form */}
			<form className="w-full mt-6" onSubmit={handleSubmit}>
				<div className="relative mt-4">
					<input
						className="floating-input mt-1 w-full text-black"
						type="text"
						id="username"
						name="username"
						placeholder=" "
						onChange={handleChange}
						required
					/>
					<label htmlFor="username" className="floating-label">
						Email
					</label>
				</div>

				<div className="relative mt-4">
					<input
						className="floating-input mt-1 w-full text-black"
						type="password"
						id="password"
						name="password"
						placeholder=" "
						onChange={handleChange}
						required
					/>
					<label htmlFor="password" className="floating-label">
						Password
					</label>
				</div>

				<div className="mt-6 flex justify-center items-center">
					<ButtonPrimary type="submit" className="min-w-[50%]">
						Submit
					</ButtonPrimary>
				</div>
			</form>
		</div>
	);
}
