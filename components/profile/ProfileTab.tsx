import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";
import BarangayKeyMetric from "./BarangayKeyMetric";

const ProfileTab = () => {
	return (
		<div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray/20 py-6 px-4 md:px-12 h-auto">
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
			<BarangayKeyMetric />
		</div>
	);
};

export default ProfileTab;
