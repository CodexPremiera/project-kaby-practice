"use client";

import { useState } from "react";
import Frontline from "./Frontline";
import AroundYou from "./AroundYou";
import GeneralPublic from "./GeneralPublic";
import { RiFilter3Line } from "react-icons/ri";

// Tab Components
const TAB_COMPONENTS = {
	frontline: <Frontline />,
	"around-you": <AroundYou />,
	"general-public": <GeneralPublic />,
};

// Tab Labels
const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	frontline: "Frontline",
	"around-you": "Around You",
	"general-public": "General Public",
};

const SearchResults = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("around-you");

	return (
		<div className="flex flex-col w-full ">
			<div className="relative flex flex-col w-full min-h-screen">
				<div className="flex justify-between bg-white px-8 pb-2 py-2">
					<nav className="flex gap-6">
						{Object.keys(TAB_COMPONENTS).map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab as keyof typeof TAB_COMPONENTS)}
								className={`text-sm px-4 py-1 rounded-md transition-colors duration-200 ease-in-out focus:outline-none ${
									activeTab === tab ? "btn-clicked" : "btn-default"
								}`}
							>
								{TAB_LABELS[tab as keyof typeof TAB_LABELS]}
							</button>
						))}
					</nav>

					{/* Filter Button */}
					<div className="flex items-center sm:ml-4 w-[100px]  px-4 py-2 border border-gray-300 rounded-md bg-white h-10 justify-center sm:justify-start">
						<RiFilter3Line className="text-gray-500 mr-2" />
						<p className="text-[14px] text-black/60">Filter</p>
					</div>
				</div>

				<div className="flex-1 justify-center overflow-y-auto items-center py-6 px-8">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default SearchResults;
