import Logo from "@/components/Logo";
import Link from "next/link";
import CitizenRegisterForm from './CitizenRegisterClient'

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

const RegisterForm = () => {
	return (
		<section className="flex flex-wrap xl:flex-nowrap">
			{/* Side Image */}
			<div className="relative w-full xl:w-1/2 h-[100vh] bg-hero bg-no-repeat bg-cover bg-center">
				<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>
				<div className="absolute top-4 left-4 z-20">
					<Logo />
				</div>
				<div className="absolute z-10 container h-full flex items-end justify-end pb-20">
					<div className="card-shadow-custom bg-primary py-3 px-3 w-full mx-8">
						<p className="text-black mx-3 font-semibold">Barangay Not Found?</p>{" "}
						<Link
							href="/petition"
							className="mx-4 text-[14px] text-secondary hover:text-black"
						>
							Submit a Petition here
						</Link>
					</div>
				</div>
			</div>
			<div className="w-full xl:w-1/2 flex justify-center items-center">
				<div className="h-auto w-[420px] py-8 px-8 bg-primary card-shadow-custom">
					<p className="h4 text-center">Sign Up (Citizen)</p>
					<CitizenRegisterForm />
					{/* <form className="w-full mt-6">
						<div className="flex gap-3 justify-between">
							<div className="relative w-full">
								<input
									className="floating-input mt-1 w-full text-black"
									type="text"
									id="first-name"
									name="first-name"
									placeholder=" "
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
									name="last-name"
									placeholder=" "
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
								required
							/>
							<label htmlFor="email" className="floating-label">
								Email
							</label>
						</div>
						<div className="relative mt-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="text"
								id="barangay"
								name="barangay"
								placeholder=" "
								required
							/>
							<label htmlFor="barangay" className="floating-label">
								Barangay
							</label>
						</div>
						<div className="relative mt-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="password"
								id="password"
								name="password"
								placeholder=" "
								required
							/>
							<label htmlFor="password" className="floating-label">
								Password
							</label>
						</div>
						<div className="relative mt-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="password"
								id="password"
								name="password"
								placeholder=" "
								required
							/>
							<label htmlFor="password" className="floating-label">
								Confirm Password
							</label>
						</div>
						<div className="mt-6 flex justify-center items-center">
							<button
								type="submit"
								className="w-[300px] py-2 text-white bg-gray rounded-md hover:bg-black"
							>
								Sign Up
							</button>
						</div>
					</form> */}
					<div className="flex flex-col justify-between items-center mt-5">
						<p className="text-[12px]">Already have an account? </p>
						<Link href="/login" className="text-[12px] text-secondary mt-1">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterForm;
