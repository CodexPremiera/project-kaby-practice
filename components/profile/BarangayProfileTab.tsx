import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";

const BarangayProfileTab = () => {
	return (
		<div className="w-full max-w-screen py-4  bg-white card-custom">
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
				<div className="gap-6 py-6 px-6 m-3 md:flex sm:gap-12 items-center sm:px-12 text-sm w-full md:w-auto">
					<div>
						<span className="h5 mr-3">48,324</span>
						residents
					</div>
					<div>
						<span className="h5 mr-3">121</span>
						citizen services with barangay badges
					</div>
					<div>
						<span className="h5 mr-3">12</span>
						barangay officials
					</div>
				</div>
			</div>
		</div>
	);
};

export default BarangayProfileTab;
