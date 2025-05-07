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
import Socials from "./Socials";
import { Button } from "@/components/ui/button";

const Footer = () => {
	return (
		<motion.footer
			variants={fadeIn("up", 0.1)}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false, amount: 0.1 }}
			className="mt-16 xl:mt-32 bg-black text-primary"
		>
			<div className="container mx-auto">
				<div className="py-12 xl:py-[30px] flex flex-col xl:flex-row gap-[10px] xl:gap-[20px]">
					{/* contact */}
					<div className="flex-1 items-center  text-border ml-8 ">
						<Link href="/" className="flex mb-6 gap-4">
							<Image src="/assets/logo.svg" width={40} height={40} alt="" />
							<p className="text-3xl font-bold">Kaby</p>
						</Link>
						<ul className="space-y-2">
							<li className="flex items-center gap-4">
								<RiMapPin2Fill className="text-accent text-xl" />
								<p className="text-md">
									N. Bacalso Ave 51 6000 Cebu City Central Visayas
								</p>
							</li>
							<li className="flex items-center gap-4">
								<RiPhoneFill className="text-accent text-xl" />
								<p className="text-md">1 (555) 000-0000</p>
							</li>
							<li className="flex items-center gap-4 ">
								<RiMailFill className="text-accent text-xl" />
								<p className="text-md">kaby@mail.com</p>
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
					<div className="flex-1 text-border ml-8 ">
						<h4 className="text-3xl font-bold text-white mb-10"> Newsletter</h4>
						<p className="mb-9 max-w-[400px] text-md">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						{/* input */}
						<div className="relative max-w-[400px] flex flex-col items-end">
							<input
								type="text"
								placeholder="Enter your email"
								className="bg-[#222427] h-16 w-full pl-7 rounded-none outline-none flex items-center text-primary"
							/>
							<Button
								variant="secondary"
								className="text-black font-semibold mt-4 w-[200px]"
							>
								Subscribe
							</Button>
						</div>
					</div>
				</div>
			</div>
			{/* copyright */}
			<div className="container mx-auto xl:px=0 py-10 border-t border-border/1 text-center">
				<p className="text-border">
					Copyright &copy; 2025 Kaby. All rights reserved.
				</p>
			</div>
		</motion.footer>
	);
};

export default Footer;
