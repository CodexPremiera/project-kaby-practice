"use client";
import Post from "@/components/home/post/Post";
import Services from "@/components/home/services/Services";
import {useEffect, useState} from "react";
import ContactList from "@/components/home/contact_list/ContactList";
import OfficialsList from "@/components/home/official_list/OfficialsList";
import BarangayProfileTab from "@/components/profile/BarangayProfileTab";
import {useRouter, useSearchParams} from "next/navigation";
import SwitchTab from "@/components/ui/buttons/SwitchTab";

import { useUser } from "@/app/context/UserContext";

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
	const searchParams = useSearchParams();
	const router = useRouter();
	const tabParam = searchParams.get("tab") as keyof typeof TAB_COMPONENTS;
	const defaultTab: keyof typeof TAB_COMPONENTS = tabParam && TAB_COMPONENTS[tabParam] ? tabParam : "Services";

	const [activeTab, setActiveTab] = useState<keyof typeof TAB_COMPONENTS>(defaultTab);

	const changeTab = (tab: keyof typeof TAB_COMPONENTS) => {
		setActiveTab(tab);
		router.push(`?tab=${tab}`);
	};

	useEffect(() => {
		if (tabParam && tabParam !== activeTab) {
			setActiveTab(tabParam);
		}
	}, [tabParam]);

	const {role}= useUser();
	console.log("User role: ", role);

	return (
		<div className="flex flex-col w-full max-w-[1280px] mx-auto gap-8 swiper-coverflow">
			<div className="flex flex-col w-full gap-8 px-4">
				{(role === "barangay" || role === "citizen") && <BarangayProfileTab />}

				{/* <BarangayProfileTab/> */}
				<nav
					className="flex w-full rounded-3xl px-6 md:px-6 max-sm:justify-between gap-2 sm:gap-4 lg:gap-8 items-center background-1 border-light-color border">
					{(Object.keys(TAB_COMPONENTS) as Array<keyof typeof TAB_COMPONENTS>).map((tab) => (
						<SwitchTab
							key={tab}
							onClick={() => changeTab(tab)}
							active={activeTab === tab}
							className="px-2 pt-3 lg:pt-4 pb-2 lg:pb-3"
						>
							{TAB_LABELS[tab]}
						</SwitchTab>
					))}
				</nav>
			</div>
			{TAB_COMPONENTS[activeTab]}
		</div>
	);
};

export default Home;
