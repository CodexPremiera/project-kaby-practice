"use client";

import Post from "@/components/home/post/Post";
import Services from "@/components/home/services/Services";
import { useEffect, useState } from "react";
import ContactList from "@/components/home/contact_list/ContactList";
import OfficialsList from "@/components/home/official_list/OfficialsList";
import BarangayProfileTab from "@/components/profile/BarangayProfileTab";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";

const TAB_LABELS = {
	Services: "Services",
	Posts: "Posts",
	Officials: "Officials",
	Contact: "Contact",
} as const;

type TabKeys = keyof typeof TAB_LABELS;

const Home = () => {
	const [activeTab, setActiveTab] = useState<TabKeys>("Services");
	const [userId, setUserId] = useState<string | null>(null);
	const [userRole, setUserRole] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const res = await fetch("/api/auth/login");
				const data = await res.json();
				setUserId(data.user_id);
				setUserRole(data.role);
			} catch (err) {
				console.error("Error fetching user details:", err);
			}
		};

		fetchUserDetails();
	}, []);

	const TAB_COMPONENTS = (userId: string | null, userRole: string | null) => ({
		Services: <Services />,
		Posts: userRole ? (
			<Post userRole={userRole} />
		) : (
			<div>Loading posts...</div>
		),
		Officials: <OfficialsList />,
		Contact: <ContactList />,
	});

	return (
		<div className="flex flex-col w-full max-w-[1280px] mx-auto gap-8 swiper-coverflow">
			<div className="flex flex-col w-full gap-8 px-4">
				<BarangayProfileTab />
				<TabSwitcher
					tabComponents={TAB_COMPONENTS(userId, userRole)}
					tabLabels={TAB_LABELS}
					defaultTab="Services"
					className="flex w-full rounded-3xl px-8 md:px-10 pt-4 lg:pt-4 max-sm:justify-between gap-2 sm:gap-6 lg:gap-10 items-center background-1 border-light-color border"
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
			{TAB_COMPONENTS(userId, userRole)[activeTab]}
		</div>
	);
};

export default Home;
