import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import Logo from "../Logo";
import SearchModal from "../modal/SearchModal";
import SearchButton from "../search/SearchButton";

const Hero = () => {
	return (
		<section className="h-[95vh] bg-hero  bg-no-repeat bg-cover bg-center relative">
			{/* overlay */}
			<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>
			<div className="container mx-auto h-full flex items-center">
				<div className="z-20 text-white text-center xl:text-left mx-auto xl:mx-0 flex flex-col items-center xl:items-start max-w-[608px] my-3">
					<motion.div
						variants={fadeIn("up", 0.2)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: false, amount: 0.8 }}
						className="mb-8"
					>
						<Logo />
					</motion.div>
					<motion.h1
						variants={fadeIn("up", 0.2)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: false, amount: 0.8 }}
						className="h1 text-black mb-4"
					>
						<span className="text-primary">Filipinos</span> Public Service Tool
					</motion.h1>
					<motion.p
						variants={fadeIn("up", 0.4)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: false, amount: 0.8 }}
					>
						{" "}
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</motion.p>
					{/* btn */}
					<motion.div
						variants={fadeIn("up", 0.4)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: false, amount: 0.8 }}
					>
						<div className="mt-12">
							<SearchButton />
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
