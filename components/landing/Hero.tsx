"use client";

import Logo from "../Logo";
import SearchButton from "../home/search/SearchButton";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
	return (
		<section className="h-[95vh] bg-hero bg-no-repeat bg-cover bg-center relative">
			{/* overlay */}
			<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>

			<div className="container mx-auto h-full flex items-center">
				<div className="z-20 text-white text-center xl:text-left mx-auto xl:mx-0 flex flex-col items-center xl:items-start max-w-[608px] my-3">
					<div className="mb-8 flex justify-center items-center gap-4">
						<Logo />
						<h1 className="text-4xl font-extrabold text-black">
							Your Public Service Tool
						</h1>
					</div>

					<p className="text-4xl font-extrabold text-white">
						<Typewriter
							words={["For Filipinos", "By Filipinos"]}
							loop={false}
							cursor
							cursorStyle="|"
							typeSpeed={70}
							deleteSpeed={50}
							delaySpeed={1500}
						/>
					</p>

					<div className="mt-12">
						<SearchButton />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
