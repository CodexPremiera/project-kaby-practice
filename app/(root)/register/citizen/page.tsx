import Logo from "@/components/Logo";
import React from "react";

const RegisterForm = () => {
	return (
		<section className="flex flex-wrap xl:flex-nowrap">
			{/* Side Image */}
			<div className="w-full xl:w-1/2 h-[100vh] bg-hero bg-no-repeat bg-cover bg-center relative">
				<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>
			</div>
			<div className="w-full xl:w-1/2 flex justify-center items-center">
				<div className="h-auto w-[420px] py-8 px-8 bg-primary card-shadow-custom">
					<p className="h4 text-center">Sign Up</p>
					<form className="w-full mt-6">
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
						<div className="mt-6">
							<button
								type="submit"
								className="w-full py-2 text-white bg-gray rounded-md hover:bg-black"
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default RegisterForm;
