"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/modal/ErrorModal";
import SuccessModal from "@/components/modal/SuccessModal";
import ButtonPrimary from '@/components/ui/buttons/ButtonPrimary';

export default function CitizenRegisterClientForm() {
	const router = useRouter();
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		barangay: "",
		// password: "",
		// confirm_password: "",
		barangay_id: "",
	});

	const [barangays, setBarangays] = useState([]);
	const [modalType, setModalType] = useState(null); // Define modalType

	const handleCloseModal = () => {
		setModalType(null);
	};

	useEffect(() => {
		fetch("/api/barangay")
			.then((res) => res.json())
			.then((data) => setBarangays(data.data))
			.catch((err) => console.error("Failed fetching barangays:", err));
	}, []);

	const handleChange = (e) => {
		// setForm({ ...form, [e.target.name]: e.target.value });
		const { name, value } = e.target;

		if (name === "barangay") {
			const selectedBarangay = barangays.find(
				(b) => b.barangayName === value
			);

			setForm({
				...form,
				barangay: value,
				barangay_id: selectedBarangay?.id || "", 
			});
		} else {
			setForm({
				...form,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		
		setModalType("loading");

		const res = await fetch("/api/auth/register/citizen", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		const data = await res.json();

		if (res.ok) {
			setModalType("success");
		} else {
			setModalType("error");
		}
	};
	console.log(barangays, "these is barangay")
	return (
		<div>
			{/* Error Modal */}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content="Register failed. Please check your credentials."
					onClose={handleCloseModal}
				/>
			)}
			{/* Success Modal */}
			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content="Please wait for your confirmation emaill"
					onClose={handleCloseModal}
				/>
			)}

			{/* Sign up Form */}
			<form className="w-full mt-6" onSubmit={handleSubmit}>
				<div className="flex gap-3 justify-between">
					<div className="relative w-full">
						<input
							className="floating-input mt-1 w-full text-black"
							type="text"
							id="first-name"
							name="first_name"
							placeholder=" "
							onChange={handleChange}
							required
						/>
						<label htmlFor="first-name" className="floating-label">
							First Name
						</label>
					</div>
					<div className="relative w-full">
						<input
							className="floating-input mt-1 w-full text-black"
							type="text"
							id="last-name"
							name="last_name"
							placeholder=" "
							onChange={handleChange}
							required
						/>
						<label htmlFor="last-name" className="floating-label">
							Last Name
						</label>
					</div>
				</div>
				<div className="relative mt-4">
					<input
						className="floating-input mt-1 w-full text-black"
						type="email"
						id="email"
						name="email"
						placeholder=" "
						onChange={handleChange}
						required
					/>
					<label htmlFor="email" className="floating-label">
						Email
					</label>
				</div>
				<div className="relative mt-4">
					<select
						className="floating-input mt-1 w-full text-black"
						id="barangay"
						name="barangay"
						onChange={handleChange}
						required
					>
						<option value="">Select Barangay</option>
						{barangays.map((brgy) => (
							<option key={brgy.id} value={brgy.barangayName}>
								{brgy.barangayName}
							</option>
						))}
					</select>
				</div>

				<div className="mt-6 flex justify-center items-center">
					<ButtonPrimary type="submit" className="min-w-[50%]">
						Sign up
					</ButtonPrimary>
				</div>
			</form>
		</div>
	);
}
