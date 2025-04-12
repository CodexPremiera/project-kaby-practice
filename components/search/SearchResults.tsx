"use client";

import { useState } from "react";
import YourService from "./YourService"; // Replace with the correct path
import AroundYou from "./AroundYou"; // Replace with the correct path
import GeneralPublic from "./GeneralPublic"; // Replace with the correct path

// Tab Components
const TAB_COMPONENTS = {
	"around-you": <AroundYou />,
	"general-public": <GeneralPublic />,
};

// Tab Labels
const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	"around-you": "Around You",
	"general-public": "General Public",
};

const Page = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("around-you");

	return (
		<div className="flex flex-col w-full">
			<div className="relative flex flex-col w-full min-h-screen">
				<nav className=" bg-white flex gap-6 ">
					{Object.keys(TAB_COMPONENTS).map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab as keyof typeof TAB_COMPONENTS)}
							className={`text-sm px-6 py-2 rounded-md transition-colors duration-200 ease-in-out focus:outline-none ${
								activeTab === tab ? "btn-clicked" : "btn-default"
							}`}
						>
							{TAB_LABELS[tab as keyof typeof TAB_LABELS]}
						</button>
					))}
				</nav>

				<div className="flex-1 justify-center overflow-y-auto items-center px-1 py-6">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default Page;
