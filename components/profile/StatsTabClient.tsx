'use client'
import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";
import { useBarangayContext } from "@/app/context/BarangayContext";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // client-side version

type MainBar = {
	badge_stock: number |null;
	badge_given: number |null;
	officials_count: number |null;
	residents_count: number |null;
	about : string | null;

}
export default function StatsTabClient() {
	const {barangayId} = useBarangayContext();
	console.log("this is barangay id!!1",barangayId);
	const [mainBar, setMainBar] = useState<MainBar |null>(null);
  	const [loading, setLoading] = useState<boolean>(true);
		useEffect(() => {
			  if (!barangayId) return;

			const fetchMainbar = async () => {
			setLoading(true);
			const supabase = createClient();
			const { data, error } = await supabase
				.from("barangay_mainbar")
				.select("*")
				.eq("barangay_id", barangayId)
				.single();
			console.log("dataaaaaaaaaa",data);
			if (error) {
				console.error("Error fetching mainbar:", error);
				setLoading(false);
				return;
			}

			setMainBar(data);
			setLoading(false);
			};

			fetchMainbar();
		}, [barangayId]);
		if (loading || !mainBar) {
			return <p>Loading stats...</p>;
		}

    return (
			<div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-between w-full max-w-[380px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] py-4 sm:px-8 px-2">
				<div className="flex flex-col">
					<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">
						{mainBar.residents_count}
					</h1>
					<span className="mx-auto text-secondary max-lg:text-sm">
						residents
					</span>
				</div>
				{/* <div className="flex flex-col">
					{mainBar.about}
				</div> */}
				<div className="flex flex-col">
					<div className="flex align-center justify-center gap-1.5">
						<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">
							{mainBar.badge_given}
							
						</h1>
						{/* <Image
							src="/assets/home_badge.svg"
							width={22}
							height={22}
							alt="Profile"
						/> */}
					</div>
					<span className="text-secondary mx-auto max-lg:text-sm">badges</span>
				</div>

				<div className="flex flex-col">
					<div className="flex align-center justify-center gap-1.5">
						<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden">
							{mainBar.officials_count}
							
						</h1>
						{/* <div className="flex my-auto">
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
						</div> */}
					</div>
					<span className="mx-auto text-secondary max-lg:text-sm">
						officials
					</span>
				</div>
			</div>
    )
}