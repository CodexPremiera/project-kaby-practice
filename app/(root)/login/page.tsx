"use client";

import { useState, useEffect } from "react";
import LoginClientForm from "./LoginClient";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";

const LoginForm = () => {
	const searchParams = useSearchParams();
	const status = searchParams.get("status");

	return (
		<section>
			<div className="flex flex-wrap xl:flex-nowrap h-screen bg-primary-1 xl:gap-16 px-12 py-12 bg-gradient">
				<div className="flex flex-col relative justify-between w-full xl:w-1/2 h-[200px] xl:h-full ">
					<div className="flex rounded-3xl bg-hero bg-no-repeat bg-cover bg-center w-full h-full" />
					{/*
					<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10" />
					<div className="w-full top-4 left-4 z-20">
						<Logo />
					</div>
					<div className="w-full z-10 container h-fit flex">
						<div className="rounded-[20px] bg-primary py-3 px-3 w-full">
							<p className="text-black mx-3 font-semibold">
								Ready to lead change in your barangay?
							</p>
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
					*/}
				</div>

				<div className="w-full xl:w-1/2 xl:h-full xl:justify-between flex flex-col items-center max-xl:gap-8 xl:py-8">
					<div className="w-fit top-4 left-4 z-20">
						<Logo/>
					</div>
					<div className="h-fit xl:h-full flex items-center w-full max-w-[480px]">
						<div className="flex flex-col h-auto w-full rounded-xl xl:gap-12">
							<h1 className="font-semibold text-center" >Welcome back</h1>
							<LoginClientForm/>

							<p className="flex justify-center items-center gap-2 mt-5">
								<span>Don't have an account?</span>
								<Link
									href="/register/citizen"
									className="text-secondary mt-1"
								>
									Signup
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginForm;
