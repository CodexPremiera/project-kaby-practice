import React from "react";
import Image from "next/image";
import { RiStarFill, RiArrowLeftLine, RiAlarmLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const ManageServiceCard = () => {
	return (
		<div className="h-screen flex flex-col text-black">
			{/* Header */}
			<div className="fixed w-full sm:w-[95%] bg-white border-b border-gray-200 p-4 flex justify-between items-center">
				<div className="flex items-center gap-2 mx-3">
					<RiArrowLeftLine className="text-xl" />
					<h2 className="h5 mx-3">Manage Service</h2>
				</div>
				{/* Action Buttons */}
				<div className="flex justify-end gap-3 pr-5">
					<Button variant="tag">View Request</Button>
					<Button variant="tag">Edit</Button>
				</div>
			</div>

			{/* Scrollable content */}
			<div className="flex-1 overflow-y-auto mt-[60px] px-4 md:px-8 pt-5 pb-40 md:pb-20 space-y-10">
				<div className="flex flex-col md:flex-row gap-6">
					{/* Image */}
					<div className="w-full md:w-[45%] flex justify-center items-center bg-black/80 rounded-[10px] p-4">
						<Image
							src="/assets/img/get_started/img.png"
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
								Note: You can track your application in the application tracker
								tab.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageServiceCard;
