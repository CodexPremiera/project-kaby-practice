import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";

const ProfileTab = () => {
	return (
		<div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray/20 py-6 px-4 md:px-8 h-auto">
			<div className="flex gap-4 items-center">
				<Image
					src="/assets/profile/bg-profile.png"
					width={60}
					height={60}
					alt="Profile"
				/>
				<div>
					<div className="flex items-center gap-2 flex-wrap">
						<p className="h4">Labangon</p>
						<RiHome3Fill />
					</div>
					<p className="text-sm text-gray-600">South District Cebu City</p>
				</div>
			</div>

			<div className="card-shadow-custom gap-6 py-6 px-6 m-3 md:flex sm:gap-12 items-center sm:px-12 text-sm w-full md:w-auto">
				<div>
					<span className="h4 mr-3">48,324</span>
					residents
				</div>
				<div>
					<span className="h4 mr-3">121</span>
					citizen services with barangay badges
				</div>
				<div>
					<span className="h4 mr-3">12</span>
					barangay officials
				</div>
			</div>
		</div>
	);
};

export default ProfileTab;
