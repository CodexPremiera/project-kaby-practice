import Logo from "@/components/Logo";
import EmailModal from "@/components/mainbar/EmailModal";
import Link from "next/link";
const LoginForm = () => {
	return (
		<section>
			<EmailModal />
			<div className="flex flex-wrap xl:flex-nowrap">
				{/* Side Image */}
				<div className="relative w-full xl:w-1/2 h-[100vh] bg-hero bg-no-repeat bg-cover bg-center">
					<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>
					<div className="absolute top-4 left-4 z-20">
						<Logo />
					</div>
					<div className="absolute z-10 container h-full flex items-end justify-end pb-20">
						<div className="card-shadow-custom bg-primary py-3 px-3 w-full mx-8">
							<p className="text-black mx-3 font-semibold">
								Ready to lead change in your barangay?
							</p>{" "}
							<span className="ml-3 mr-1 text-[14px]">
								Let’s make it happen —
							</span>
							<Link
								href="/register/barangay"
								className="text-[14px] text-secondary hover:text-black"
							>
								book your appointment today.
							</Link>
						</div>
					</div>
				</div>
				<div className="w-full xl:w-1/2 flex justify-center items-center">
					<div className="h-auto w-[420px] py-8 px-8 bg-primary card-shadow-custom">
						<p className="h4 text-center">Login</p>
						<form className="w-full mt-6">
							<div className="relative mt-4">
								<input
									className="floating-input mt-1 w-full text-black"
									type="text"
									id="region"
									name="region"
									placeholder=" "
									required
								/>
								<label htmlFor="region" className="floating-label">
									Username
								</label>
							</div>

							<div className="relative mt-4">
								<input
									className="floating-input mt-1 w-full text-black"
									type="input"
									id="password"
									name="password"
									placeholder=" "
									required
								/>
								<label htmlFor="password" className="floating-label">
									Password
								</label>
							</div>
							<div className="flex flex-col justify-between items-end">
								<Link href="" className="text-[12px] text-secondary mt-1">
									Forgot Password
								</Link>
							</div>
							<div className="mt-6 flex justify-center items-center">
								<button
									type="submit"
									className="w-[300px] py-2 text-white bg-gray rounded-md hover:bg-black"
								>
									Submit
								</button>
							</div>
						</form>
						<div className="flex flex-col justify-between items-center mt-5">
							<p className="text-[12px]">Don't have an account? </p>
							<Link
								href="/register/citizen"
								className="text-[12px] text-secondary mt-1"
							>
								Signup
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginForm;
