"use client";

import Image from "next/image";
import React from "react";
import BarangayProfileClient from "@/components/profile/BarangayProfileClient";
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
		<div className="flex flex-col lg:flex-row w-full rounded-3xl px-1 pt-8 pb-6 lg:py-4 gap-6 items-center justify-between background-1 border-light-color border">
			{/* Profile Section */}
			<BarangayProfileClient />

			{/* Stats section */}
			<div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-between w-full max-w-[380px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] py-4 sm:px-8 px-2">
				<div className="flex flex-col">
					<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">
						48,234
					</h1>
					<span className="mx-auto text-secondary max-lg:text-sm">
						residents
					</span>
				</div>

				<div className="flex flex-col">
					<div className="flex align-center justify-center gap-1.5">
						<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">
							121
						</h1>
						<Image
							src="/assets/home_badge.svg"
							width={22}
							height={22}
							alt="Profile"
						/>
					</div>
					<span className="text-secondary mx-auto max-lg:text-sm">badges</span>
				</div>

				<div className="flex flex-col">
					<div className="flex align-center justify-center gap-1.5">
						<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">
							12
						</h1>
						<div className="flex my-auto">
							<Image
								src="/assets/img/profile/bg-profile.png"
								width={20}
								height={20}
								alt="Profile"
								className="mr-[-4px] w-[20px] h-[20px] object-cover rounded-full shadow-xs"
							/>
							<Image
								src="/assets/img/profile/bg-profile.png"
								width={20}
								height={20}
								alt="Profile"
								className="mr-[-4px] w-[20px] h-[20px] object-cover rounded-full shadow-xs"
							/>
							<Image
								src="/assets/img/profile/bg-profile.png"
								width={20}
								height={20}
								alt="Profile"
								className="mr-[-4px] w-[20px] h-[20px] object-cover rounded-full shadow-xs"
							/>
						</div>
					</div>
					<span className="mx-auto text-secondary max-lg:text-sm">
						officials
					</span>
				</div>
			</div>
		</div>
	);
};

export default BarangayProfileTab;
