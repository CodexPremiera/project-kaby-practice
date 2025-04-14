"use client";

import { useState } from "react";
import { RiFilter3Line } from "react-icons/ri";
import SearchBar from "@/components/search/SearchBar";
import Frontline from "@/components/search/Frontline";
import AroundYou from "@/components/search/AroundYou";
import GeneralPublic from "@/components/search/GeneralPublic";

const TAB_COMPONENTS = {
	frontline: <Frontline />,
	"around-you": <AroundYou />,
	"general-public": <GeneralPublic />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	frontline: "Frontline",
	"around-you": "Around You",
	"general-public": "General Public",
};

const Search = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("around-you");

	return (
		<div className="flex flex-col w-full">
			<div className="relative flex flex-col w-full min-h-screen">
				{/* Top Bar: Tabs + Search + Filter */}
				<div className="flex flex-col-reverse gap-4 bg-white px-4 sm:px-8 py-4 lg:flex-row lg:justify-between lg:items-center border-b border-gray-200">
					{/* Tabs */}
					<nav className="flex flex-wrap gap-2 sm:gap-4">
						{Object.keys(TAB_COMPONENTS).map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab as keyof typeof TAB_COMPONENTS)}
								className={`text-sm px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none ${
									activeTab === tab ? "btn-clicked" : "btn-default"
								}`}
							>
								{TAB_LABELS[tab as keyof typeof TAB_LABELS]}
							</button>
						))}
					</nav>

					{/* Search + Filter */}
					<div className="flex flex-col sm:flex-row sm:items-center gap-2">
						<SearchBar />
						<div className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white h-10 justify-center sm:justify-start">
							<RiFilter3Line className="text-gray-500 mr-2" />
							<p className="text-sm text-black/60">Filter</p>
						</div>
					</div>
				</div>

				{/* Results Content */}
				<div className="flex-1 justify-center overflow-y-auto items-center py-6 px-4 sm:px-8">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default Search;
