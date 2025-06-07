"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/modal/ErrorModal";
import LoadingModal from "@/components/modal/LoadingModal";
import SuccessModal from "@/components/modal/SuccessModal";

import ButtonPrimary from '@/components/ui/buttons/ButtonPrimary';

export default function VerifyClientForm() {
	const router = useRouter();

	const [form, setForm] = useState({
		email: "",
		
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
            console.log("form",form);
			const res = await fetch("/api/verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (res.ok) {
				const data = await res.json();
                // console.log("this is data",data);
                console.log("this is success",data.success);
                if(data.success){
                    setModalType("loading");
                    // Redirect after short delay while showing loading state
                    setTimeout(() => {
                        // router.push(data.redirectTo);
                        alert("this is data",data);
                    }, 1500);
                }else{
                    setModalType("error");
                }
			} else {
				setModalType("error");
			}
		} catch (err) {
			setModalType("error");
			console.error("Error logging in:", err);
		}
	};

    const handleCloseErrorModal = () => {
        setModalType(null);
    }

	return (
		<div>
			{/* Loading Modal */}
			{modalType === "loading" && (
				<SuccessModal title="Success" content="A verification link has been sent to your email..." onClose={handleCloseModal} />
			)}

			{/* Error Modal */}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content="Verification failed. You are not registered with an access role."
					onClose={handleCloseModal}
				/>
			)}

			<form className="w-full mt-6" onSubmit={handleSubmit}>
                <p>Barangay Login Detected.</p>

				<div className="relative mt-4">
					<input
						className="floating-input mt-1 w-full text-black"
						type="text"
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

				<div className="mt-6 flex justify-center items-center">
					<ButtonPrimary type="submit" className="min-w-[50%]">
						Verify
					</ButtonPrimary>
				</div>
			</form>
		</div>
	);
}
