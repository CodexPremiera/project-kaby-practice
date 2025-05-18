"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingModal from "../modal/LoadingModal";
import ErrorModal from "../modal/ErrorModal";

interface Props {
	onClose: () => void;
}

const CreateAccount: React.FC<Props> = ({ onClose }) => {
	const [modalType, setModalType] = useState<string | null>(null);
	const router = useRouter();

	const handleCloseModal = () => {
		setModalType(null);
	};

	const [formData, setFormData] = useState({
		barangay: "",
		city: "",
		region: "",
		barangayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await fetch("/api/admin/appointment", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (res.ok) {
			setModalType("loading");
			setTimeout(() => {
				router.push(`/barangay_desk`);
			}, 1000);
		} else {
			setModalType("error");
		}
		console.log("Form submitted:", formData);
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-6">
			<div className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex flex-col gap-6">
					<div className="flex justify-between items-center py-3 pt-5 bg-gray-100">
						<div className="text-medium font-semibold text-black px-6">
							Create Barangay Account
						</div>
						<div className="absolute top-4 right-4 cursor-pointer">
							<RiCloseLine
								className="w-6 h-6 text-black hover:text-white"
								onClick={onClose}
							/>
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="flex flex-col md:flex-row gap-6 py-2 px-6">
							<div className="flex flex-col w-full gap-4">
								<div className="flex flex-col flex-1">
									<p className="text-sm">Address:</p>
									<div className="flex gap-6">
										<Input
											placeholder="Enter Barangay"
											name="barangay"
											value={formData.barangay}
											onChange={handleChange}
										/>
										<Input
											placeholder="Enter City"
											name="city"
											value={formData.city}
											onChange={handleChange}
										/>
										<Input
											placeholder="Enter Region"
											name="region"
											value={formData.region}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="flex flex-col">
									<p className="text-sm">Barangay Name:</p>
									<Input
										placeholder="Enter Barangay Username"
										name="barangayName"
										value={formData.barangayName}
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col">
									<p className="text-sm">Email:</p>
									<Input
										placeholder="Enter Email"
										name="email"
										value={formData.email}
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col">
									<p className="text-sm">Password:</p>
									<Input
										placeholder="Enter Password"
										name="password"
										type="password"
										value={formData.password}
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col">
									<p className="text-sm">Confirm Password:</p>
									<Input
										placeholder="Confirm Password"
										name="confirmPassword"
										type="password"
										value={formData.confirmPassword}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row justify-end pb-6 px-6">
							<Button className="w-full sm:w-auto">Create</Button>
						</div>
					</form>
				</div>
			</div>

			{/* Loading Modal */}
			{modalType === "loading" && (
				<LoadingModal title="Success" content="Creating the account..." />
			)}

			{/* Error Modal */}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content="Account Creation Failed. Try Again."
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default CreateAccount;
