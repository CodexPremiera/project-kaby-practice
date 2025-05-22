"use client";

import React, {useMemo, useState} from "react";
import {AgePopulation} from "@/components/ui/charts/AgePopulation";
import {SectorPopulation} from "@/components/ui/charts/SectorPopulation";


const Dashboard = ()=> {
	return (
		<div className="flex flex-col lg:flex-row gap-8 p-4 sm:p-6 background-1 rounded-[10px]">
			<div className="lg:w-[50%]">
				<AgePopulation/>
			</div>

			<div className="lg:w-[50%]">
				<SectorPopulation/>
			</div>
		</div>
	);
};

export default Dashboard;
