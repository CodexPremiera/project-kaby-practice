import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";
import BarangayKeyMetric from "./BarangayKeyMetric";

const ProfileTab = () => {
	return (
		<div className="w-full max-w-screen py-4 border-b border-gray-200 bg-white">
			<div className="flex flex-col lg:flex-row items-center lg:items-start justify-between px-12 min-h-[100px]">
				<div className="flex gap-4 items-center text-center lg:text-left my-4">
					<Image
						src="/assets/profile/bg-profile.png"
						width={60}
						height={60}
						alt="Profile"
						className="min-w-[60px] min-h-[60px]"
					/>
					<div className="flex flex-col">
						<div className="flex items-center justify-center lg:justify-start gap-2 ">
							<p className="text-lg font-semibold">Labangon</p>
							<RiHome3Fill className="text-secondary" />
						</div>
						<p className="text-sm text-gray-600">South District Cebu City</p>
					</div>
				</div>
				<BarangayKeyMetric />
			</div>
		</div>
	);
};

export default ProfileTab;
