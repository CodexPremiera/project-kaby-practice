
"use client";
// 'use server'
import BarangayProfileClient from "./BarangayProfileClient";
// import BarangayService from "@/services/BarangayService"
// import { createClient } from "@/utils/supabase/server";

const BarangayProfileTab = async () => {
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
	// const supabase = await createClient();
	// const barangayService = new BarangayService(supabase);



	return (
		<div className="flex flex-col lg:flex-row w-full rounded-3xl px-6 pt-8 pb-6 lg:py-4 gap-6 items-center justify-between background-1 border-light-color border">
			<div className="flex gap-4 lg:gap-6 items-center">
				<Image
					src="/assets/img/profile/bg-profile.png"
					width={60}
					height={60}
					alt="Profile"
					className="w-12 h-12 lg:w-15 lg:h-15 rounded-full object-cover"
				/>
				<div className="flex-col gap-2">
					<div className="flex gap-3 items-center">
						<h1 className="text-2xl md:text-3xl lg:text-4xl overflow-hidden">Labangon</h1>
						<div className="w-7 h-7">
							<Image
								src="/assets/home_badge.svg"
								width={28}
								height={28}
								alt="Profil"
								className="w-5 h-5 lg:w-7 lg:h-7 rounded-full object-cover my-auto"
							/>
						</div>
					</div>
					<span className="text-secondary truncate max-lg:text-sm">
						South District, Cebu City, Cebu
					</span>
				</div>
			</div>

			{/* Stats section */}
			<div
				className="flex flex-wrap gap-4 sm:gap-8 items-center justify-between w-full max-w-[380px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] py-4 sm:px-8 px-2">
				<div className="flex flex-col">
					<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">48,234</h1>
					<span className="mx-auto text-secondary max-lg:text-sm">residents</span>
				</div>

				<div className="flex flex-col">
					<div className="flex align-center justify-center gap-1.5">
						<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">121</h1>
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
						<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">12</h1>
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
					<span className="mx-auto text-secondary max-lg:text-sm">officials</span>
				</div>

			</div>
		</div>
	);
};

export default BarangayProfileTab;
