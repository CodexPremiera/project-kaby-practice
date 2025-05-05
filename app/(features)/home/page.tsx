"use client";
import Post from "@/components/home/post/Post";
import Search from "@/components/home/search/Search";
import { useState } from "react";
import ContactList from "@/components/home/contact_list/ContactList";
import OfficialsList from "@/components/home/official_list/OfficialsList";
import BarangayProfileTab from "@/components/profile/BarangayProfileTab";

const TAB_COMPONENTS = {
	Services: <Search />,
	Posts: <Post />,
	Officials: <OfficialsList />,
	Contact: <ContactList />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
	Services: "Services",
	Posts: "Posts",
	Officials: "Officials",
	Contact: "Contact",
};

const Home = () => {
	const [activeTab, setActiveTab] =
		useState<keyof typeof TAB_COMPONENTS>("Services");

	return (
		<div className="flex flex-col w-full">
			<div className="relative flex flex-col w-full min-h-screen ">
				<BarangayProfileTab />
				<nav className="flex bg-white gap-4 pl-8  mb-4 border-b border-gray-100 sm:rounded-b-[20px]">
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
				<div className="flex-1 justify-center overflow-y-auto items-center ">
					{TAB_COMPONENTS[activeTab]}
				</div>
			</div>
		</div>
	);
};

export default Home;
