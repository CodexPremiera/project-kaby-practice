"use client";
import Post from "@/components/home/post/Post";
import Services from "@/components/home/services/Services";
import {useEffect, useState} from "react";
import ContactList from "@/components/home/contact_list/ContactList";
import OfficialsList from "@/components/home/official_list/OfficialsList";
import BarangayProfileTab from "@/components/profile/BarangayProfileTab";
import {useRouter, useSearchParams} from "next/navigation";

import { useUser } from "@/app/context/UserContext";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";

const TAB_COMPONENTS = {
	Services: <Services />,
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
	const [activeTab, setActiveTab] = useState<keyof typeof TAB_COMPONENTS>("Services");

	return (
		<div className="flex flex-col w-full max-w-[1280px] mx-auto gap-8 swiper-coverflow">
			<div className="flex flex-col w-full gap-8 px-4">
				<BarangayProfileTab/>
				<TabSwitcher tabComponents={TAB_COMPONENTS}
										 tabLabels={TAB_LABELS}
										 defaultTab={"Services"}
										 className="flex w-full rounded-3xl px-8 md:px-10 pt-4 lg:pt-4 max-sm:justify-between gap-2 sm:gap-6 lg:gap-10 items-center background-1 border-light-color border"
										 activeTab={activeTab}
										 setActiveTab={setActiveTab}
				/>
			</div>
			{TAB_COMPONENTS[activeTab]}
		</div>
	);
};

export default Home;
