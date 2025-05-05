"use client";

import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import Frontline from "@/components/home/search/Frontline";
import AroundYou from "@/components/home/search/AroundYou";
import GeneralPublic from "@/components/home/search/GeneralPublic";

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
			<div className="relative flex flex-col w-full min-h-screen bg-white sm:rounded-[20px]">
				<div className="flex flex-col-reverse gap-6 px-4 sm:px-8 pt-4 pb-2  lg:flex-row lg:justify-between lg:items-center ">
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

					{/* Search */}
					<div className="flex sm:items-center">
						<div className="flex items-center w-full sm:w-[350px] px-4 border border-gray-300 bg-white rounded-md">
							<RiSearch2Line className="text-gray-500 mr-2" />
							<input
								type="text"
								placeholder="Search for services"
								className="w-full focus:outline-none focus:ring-0 text-[14px] h-10"
							/>
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
