"use client";
import { useEffect, useState } from "react";

//components

import Pretitle from "@/components/landing/Pretitle";
import Logo from "@/components/Logo";

const About = () => {
	const [headerActive, setHeaderActive] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setHeaderActive(window.scrollY > 200);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div className="overflow-hidden">
			<div className="h-[45vh] bg-hero  bg-no-repeat bg-cover bg-center relative">
				<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>
				<div className="absolute top-4 left-4 z-20">
					<Logo />
				</div>
			</div>
			<div className="pt-16 xl:pt-22" id="about">
				<div className="text-center max-w-[80%] mx-auto mb-10 sm:mb-16 xl:mb-20 rounded-[20px] py-10">
					<Pretitle text="About Kaby" center />
					<p className="mb-4 max-w-[560px] mx-auto py-6">
						Kaby bridges the gap between barangays and citizens, making public
						services more efficient, transparent, and accessible for all.
					</p>
				</div>
				<div className="text-center max-w-[80%] mx-auto mb-10 sm:mb-16 xl:mb-20 rounded-[20px] py-10">
					<Pretitle text="Our Mission" center />
					<p className="mb-4 max-w-[560px] mx-auto py-6">
						Kaby bridges the gap between barangays and citizens, making public
						services more efficient, transparent, and accessible for all.
					</p>
				</div>
				<div className="text-center max-w-[80%] mx-auto mb-10 sm:mb-16 xl:mb-20 rounded-[20px] py-10">
					<Pretitle text="Our Vision" center />
					<p className="mb-4 max-w-[560px] mx-auto py-6">
						Kaby bridges the gap between barangays and citizens, making public
						services more efficient, transparent, and accessible for all.
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
