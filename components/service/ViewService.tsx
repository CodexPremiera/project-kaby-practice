import React from "react";
import Image from "next/image";
import { RiStarFill, RiAlarmLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "../ui/button";

const ViewService = () => {
	return (
		<div className="flex flex-col-reverse md:flex-row gap-6">
			{/* Image */}
			<div className="w-full md:w-[400] md:h-[360] flex justify-center items-center bg-black/80 rounded-[10px]">
				<Image
					src="/assets/img/service-img.png"
					width={360}
					height={360}
					alt="service image"
					className="rounded-lg"
				/>
			</div>

			{/* Details */}
			<div className="w-full flex-1 border border-gray-200 rounded-[10px] p-8 flex flex-col space-y-4">
				<div className="flex justify-between border-b border-gray-200 ">
					<div className="flex items-center gap-2 ">
						<h2 className="h5">Bondy's Photography</h2>
					</div>
					<div className="flex items-center gap-2 text-sm ">
						<RiStarFill className="text-secondary" />
						<span className="h5">4.8</span>

						<span className="h5">300 Availed</span>
					</div>
				</div>

				{/* Info Header */}
				<div className="flex flex-col sm:flex-row justify-between h6">
					<p> By: Bondy Might • Personal</p>
					<div className="flex items-center gap-2 sm:mt-0 ">
						<RiAlarmLine />
						<span>Scheduled: Not Applicable</span>
					</div>
				</div>

				{/* Description */}
				<div>
					<p className="mb-2 h6 ">Description:</p>
					<div className="bg-gray/30 rounded-[10px] p-3 h-[150px] h6-light">
						Some Description Here
					</div>
				</div>

				{/* Requirements */}
				<div>
					<p className="mb-2 h6">Requirements Needed:</p>
					<div className="bg-gray/30 rounded-[10px] p-3 h6-light">None</div>
				</div>

				{/* Fees and Note */}
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-between text-sm">
					<div className="flex-1">
						<p>Service Fee:</p>
						<p className="text-secondary h5">P3500.00 - 5000.00</p>
					</div>
					<div className="flex-1">
						<p>Agreement Fee:</p>
						<p className="text-secondary h5">P150.00</p>
					</div>
					<div className="flex-1 italic h6-light">
						Note: You can track your application in the application tracker tab.
					</div>
				</div>
				<div className="flex justify-end gap-3 pt-2 pr-5">
					<Link href="">
						<Button variant="tag">Add to tracker</Button>
					</Link>
					<Button variant="tag">Proceed</Button>
				</div>
			</div>
		</div>
	);
};

export default ViewService;
