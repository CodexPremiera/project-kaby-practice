"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";

// Type for the stats data items
interface StatItem {
	endCountNum: number;
	endCountText: string;
	text: string;
}

const statsData: StatItem[] = [
	{
		endCountNum: 99,
		endCountText: "%",
		text: "Citizen Satisfaction",
	},
	{
		endCountNum: 32,
		endCountText: "k",
		text: "Happy Barangays",
	},
	{
		endCountNum: 42,
		endCountText: "k",
		text: "Barangays in the Philippines",
	},
];

const Stats = () => {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref);

	
	return (
		<div ref={ref} className="mt-8 xl:mt-32 bg-black-100 py-10 w-full">
			<div className="container mx-auto h-full">
				<div className="text-white flex flex-col items-center justify-between xl:flex-row h-full gap-12 text-center xl:text-left">
					{statsData.map((item, index) => (
						<div className="w-full" key={index}>
							<div className="text-5xl font-semibold">
								{inView && (
									<CountUp
										start={0}
										end={item.endCountNum}
										delay={0.5}
										duration={3}
									/>
								)}
								<span>{item.endCountText}</span>
							</div>
							<p>{item.text}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Stats;
