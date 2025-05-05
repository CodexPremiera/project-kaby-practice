"use client";

import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";

const BarangayProfileTab = () => {
	const stats = [
		{
			value: "48,324",
			label: "Residents",
		},
		{
			value: "121",
			label: "Service Badges",
		},
		{
			value: "12",
			label: "Officials",
		},
	];

	return (
		<div className="w-full max-w-screen py-4 bg-white sm:rounded-t-[20px]">
			<div className="flex flex-col lg:flex-row items-center  justify-between px-6 lg:px-12 min-h-[100px]">
				{/* Profile Section */}
				<div className="flex gap-4 items-center text-left my-4 flex-shrink-0 w-[500px] px-8 lg:px-0">
					<Image
						src="/assets/profile/bg-profile.png"
						width={60}
						height={60}
						alt="Profile"
						className="min-w-[60px] min-h-[60px] rounded-full object-cover"
					/>
					<div className="flex flex-col max-w-[220px]">
						<div className="flex items-center gap-2 flex-wrap">
							<p className="text-lg font-semibold truncate">Labangon</p>
							<RiHome3Fill className="text-secondary" size={22} />
						</div>
						<p className="text-sm text-gray-600 truncate">
							South District Cebu City
						</p>
					</div>
				</div>

				{/* Stats Section */}
				<div className="flex flex-wrap gap-6 sm:gap-8 items-center justify-between w-full py-4 sm:px-8 px-4  rounded-[20px] ">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="flex items-center gap-2 flex-row text-center"
						>
							<div className="flex items-center gap-2 sm:gap-1">
								<span className="text-sm font-semibold">{stat.value}</span>
							</div>

							<div className="flex items-center gap-2 sm:gap-1 ">
								<span className=" text-sm">{stat.label}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BarangayProfileTab;
