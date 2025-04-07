import React from 'react'

import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import Pretitle from '../Pretitle';
import Stats from './Stat';

const About = () => {
  return (
		<div className="pt-16 xl:pt-32" id="about">
			<div className="container mx-auto">
				<motion.div
					variants={fadeIn("up", 0.2)}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, amount: 0.8 }}
					className="text-center max-w-[full] mx-auto xl:mb-20"
				>
					<Pretitle text="About Kaby" center />
					<p className="mb-4 max-w-[560px] mx-auto">
						Kaby bridges the gap between barangays and citizens, making public
						services more efficient, transparent, and accessible for all.
					</p>
				</motion.div>
			</div>
      <Stats/>
		</div>
	);
}

export default About