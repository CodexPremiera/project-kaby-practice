"use client";
import { useEffect, useState } from "react";

//components
import Topbar from "@/components/landing/Topbar";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import GetStarted from "@/components/landing/GetStarted";
import Faq from "@/components/landing/Faq";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Home = () => {
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
			<Topbar />
			{/* static header */}
			<div className="relative z-10">
				<Header />
			</div>
			{/* animated header */}
			<div
				className={`w-full transition-transform duration-500 fixed top-0 left-0 z-50 ${
					headerActive ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<Header />
			</div>
			<Hero />
			<About />
      		<GetStarted/>
			<Faq />
			<Contact />
			<Footer />
		</div>
	);
};

export default Home;