"use client";
import { useEffect, useState } from "react";

//components
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import GetStarted from "@/components/landing/GetStarted";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";

const Landing = () => {
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
			{/* animated header */}
			<div
				className={`w-full transition-transform duration-500 fixed top-0 left-0 z-50 ${
					headerActive ? "translate-y-0" : "-translate-y-full"
				}`}
			>
			<Header />
			</div>
			<Hero />
			<GetStarted />
			<About />
			<Faq />
			<Footer />
		</div>
	);
};

export default Landing;