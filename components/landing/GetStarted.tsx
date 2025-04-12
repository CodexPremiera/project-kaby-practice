import Image from "next/image";
import Link from "next/link";

import { RiArrowRightUpLine, RiCheckboxCircleFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import Pretitle from "./Pretitle";
import Stat from "./Stat";

const userTypeData = [
	{
		img: "/assets/img/get_started/img.png",
		name: "For Citizens",
		description: ["Streamline processes", "Keep your community engaged."],
		href: "/register/citizen",
	},
	{
		img: "/assets/img/get_started/img.png",
		name: "For Barangays",
		description: [
			"Stay informed",
			"Access and avail services",
			"Showcase your skills",
		],
		href: "/register/barangay",
	},
];

const GetStarted = () => {
	return (
		<section className="pt-16 xl:pt-38" id="get_started">
			<div className="container mx-auto">
				<div className="flex flex-col xl:flex-row relative">
					{/* text */}
					<motion.div
						variants={fadeIn("right", 0.2)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: false, amount: 0.2 }}
						className="flex-1 max-w-[484px] xl:pt-[54px] mb-12 xl:mb-0 ml-3"
					>
						<Pretitle text="Get Started" />
						<p className="mb-4 max-w-[480px] mx-auto mt-12">
							Kaby bridges the gap between barangays and citizens, making public
							services more efficient, transparent, and accessible for all.
						</p>
						<Stat />
					</motion.div>

					{/* img */}
					<motion.div
						variants={fadeIn("left", 0.2)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: false, amount: 0.2 }}
						className="flex-1 flex flex-col xl:flex-row xl:justify-end"
					>
						<div className="relative xl:flex xl:w-[680px] xl:h-[580px] sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mx-6 gap-2">
							{userTypeData.map((item, index) => {
								return (
									<div
										key={index}
										className="w-full h-[492px] flex-1 relative overflow-hidden group flex justify-center card-shadow-custom"
									>
										<Image
											src={item.img}
											fill
											className="object-cover transition-all duration-500 rounded-[10px]"
											alt=""
											quality={100}
										/>

										{/* Black overlay with 20% opacity when hovered */}
										<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-[10px]"></div>

										{/* Default Overlay */}
										<div className="w-full h-[86px] absolute bottom-0 left-0 right-0 flex justify-between items-center text-black-100">
											<div className="pl-8">
												<h4 className="text-black font-primary font-semibold tracking-[1px] uppercase">
													{item.name}
												</h4>
											</div>
										</div>

										{/* Hover Effect */}
										<div className="w-full h-[360px] bg-secondary absolute bottom-0 left-0 right-0 flex justify-between pt-[40px] group-hover:translate-y-0 translate-y-[100%] transition-all duration-500 ">
											<div className="pl-8">
												<h4 className="text-black h4 font-semibold uppercase mb-2">
													{item.name}
												</h4>
												{item.description.map((desc, idx) => (
													<div key={idx} className="flex items-center gap-1">
														<RiCheckboxCircleFill className="text-accent text-xl" />
														<p className="text-black w-[90%] my-1">{desc}</p>
													</div>
												))}
											</div>
											<Link
												href={item.href}
												className="w-[44px] xl:w-[60px] xl:h-[60px] h-[20px] bg-accent text-black text-2xl flex justify-center items-center absolute right-3 bottom-10 rounded-[10px]"
											>
												<RiArrowRightUpLine />
											</Link>
										</div>
									</div>
								);
							})}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default GetStarted;
