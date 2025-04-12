"use client";

import { useState } from "react";
import Post from "../post/page";
import Search from "../search/page";

const TAB_COMPONENTS = {
	Services: <Search />,
	Announcements: <Post />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	Services: "Services",
	Announcements: "Announcements",
};

const Page = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("Services");

	return (
		<div className="flex flex-col w-full">
			<div className="relative flex flex-col w-full min-h-screen">
				<nav className="sticky top-0 z-2 bg-white flex gap-6 pl-3 border-b border-gray-200">
					{Object.keys(TAB_COMPONENTS).map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab as keyof typeof TAB_COMPONENTS)}
							className={`text-sm px-4 py-3 border-b-2 transition-colors ${
								activeTab === tab
									? "border-secondary text-secondary"
									: "border-transparent text-gray-600 hover:text-secondary"
							}`}
						>
							{TAB_LABELS[tab as keyof typeof TAB_LABELS]}
						</button>
					))}
				</nav>

				{/* Main content area */}
				<div className="flex-1 justify-center overflow-y-auto items-center">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default Page;
