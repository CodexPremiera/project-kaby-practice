import Image from "next/image";
import Link from "next/link";

import {
	RiMapPin2Fill,
	RiPhoneFill,
	RiMailFill,
	RiArrowRightLine,
} from "react-icons/ri";

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import Socials from "../Socials";



const Footer = () => {
	return (
		<motion.footer
			variants={fadeIn("up", 0.1)}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false, amount: 0.1 }}
			className="mt-16 xl:mt-32 bg-black"
		>
			<div className="container mx-auto">
				<div className="py-12 xl:py-[30px] flex flex-col xl:flex-row gap-[30px] xl:gap-[20px]">
					{/* logo & text */}
					{/* contact */}
					<div className="flex-1 text-border ml-8">
						<Link href="/" className="flex mb-6">
							<Image src="/assets/logo2.png" width={230} height={48} alt="" />
						</Link>
						<ul className="space-y-2">
							<li className="flex items-center gap-4">
								<RiMapPin2Fill className="text-accent text-xl" />
								<p>N. Bacalso Ave 51 6000 Cebu City Central Visayas</p>
							</li>
							<li className="flex items-center gap-4">
								<RiPhoneFill className="text-accent text-xl" />
								<p>1 (555) 000-0000</p>
							</li>
							<li className="flex items-center gap-4">
								<RiMailFill className="text-accent text-xl" />
								<p>kaby@mail.com</p>
							</li>
							<li className="flex items-center gap-4 py-[18px]">
								<Socials
									containerStyles="flex gap-6 text-white"
									iconStyles="hover:text-accent transition-all"
								/>
							</li>
						</ul>
					</div>
					{/* newsletter */}
					<div className="flex-1 text-border ml-8">
						<h4 className="h4 text-white mb-10"> Newsletter</h4>
						<p className="mb-9">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						{/* input */}
						<div className="relative max-w-[370px]">
							<input
								type="text"
								placeholder="Enter your email"
								className="bg-[#222427] h-16 w-full pl-7 rounded-none outline-none flex items-center"
							/>
							<button className="bg-accent w-12 h-12 absolute right-2 top-2 bottom-2 text-primary text-xl flex items-center justify-center">
								<RiArrowRightLine />
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* copyright */}
			<div className="container mx-auto xl:px=0 py-10 border-t border-border/10 text-center">
				<p className="text-border">
					Copyright &copy; 2025 UrbanBuild. All rights reserved.
				</p>
			</div>
		</motion.footer>
	);
};

export default Footer;
