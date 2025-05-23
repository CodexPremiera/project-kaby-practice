"use client";

import Image from "next/image";
import React from "react";
import BarangayProfileClient from "@/components/profile/BarangayProfileClient";
import StatsTabClient from "@/components/profile/StatsTabClient";
import { officials } from "@/data/officials";
import  { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";

const BarangayProfileTab = () => {
	const {role} = useUser();
	if (role === "admin") return null;
	// TODO: PWEDE RA COPY PASTE ANG BRGY PROFILE CLIENT BALIK DIRI
	return (
		<div className="flex flex-col lg:flex-row w-full rounded-3xl px-1 pt-8 pb-6 lg:py-4 gap-6 items-center justify-between background-1 border-light-color border">
			{/* Profile Section */}
			<BarangayProfileClient />

			{/* Stats section */}
			<StatsTabClient />

			
		</div>
	);
};

export default BarangayProfileTab;
