import Link from "next/link";
import Logo from "@/components/Logo";
import React, { ReactNode } from "react";

interface AuthWrapperProps {
	children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
	return (
		<section>
			<div className="flex flex-wrap xl:flex-nowrap h-fit xl:h-screen bg-primary-1 gap-6 xl:gap-16 p-6 md:p-8 lg:p-12 background-1">
				<div className="flex flex-col relative justify-between w-full xl:w-1/2 h-[200px] xl:h-full">
					<div className="flex rounded-3xl bg-hero bg-no-repeat bg-cover bg-center w-full h-full" />
				</div>

				<div className="w-full xl:w-1/2 xl:h-full xl:justify-between flex flex-col items-center max-xl:gap-8 xl:pt-8 xl:pb-4">
					<div className="w-fit top-4 left-4 z-20">
						<Logo/>
					</div>
					<div className="h-fit xl:h-full flex items-center w-full max-w-[480px]">
						<div className="flex flex-col h-auto w-full rounded-xl xl:gap-8 mt-10">
							{children}
						</div>
					</div>

					<div className="flex gap-2 w-full mt-8 mb-2  h-fit flex-col md:flex-row">
						<div className="flex flex-col rounded-xl border border-secondary gap-1 py-3 px-2 w-full">
							<span className="text-black mx-3 font-semibold">
								Ready to lead your barangay?
							</span>
							<span className="flex flex-wrap ml-3 mr-1 text-sm gap-1">
								Let’s make it happen —
								<Link href="/register/barangay"
											className="text-sm text-accent hover:underline"
								>
								book your appointment today.
							</Link>
							</span>
						</div>

						<div className="flex flex-col rounded-xl border border-secondary gap-1 py-3 px-2 w-full">
							<span className="text-black mx-3 font-semibold">
								Can't find your home barangay?
							</span>
							<span className="flex flex-wrap ml-3 mr-1 text-sm gap-1">
								Help us call them —
								<Link href="/petition/"
											className="text-sm text-accent hover:underline"
								>
								submit petition to build page here.
							</Link>
							</span>
						</div>
					</div>
				</div>


			</div>
		</section>
	);
};

export default AuthWrapper;
