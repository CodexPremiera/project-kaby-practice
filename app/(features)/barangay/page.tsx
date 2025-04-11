"use client";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ProfileTab from "@/components/ProfileTab";
import SearchResults from "../search/SearchResults";

const BarangayHome = () => {
	return (
		<div>
			<ProfileTab />
			<Tabs selectedTabClassName="border-b-2 border-secondary text-secondary">
				<TabList className="flex space-x-6 mt-4 mx-4 border-b border-gray/20">
					<Tab className="tab-style">Services</Tab>
					<Tab className="tab-style">Announcements</Tab>
				</TabList>

				<div className="max-h-[calc(100vh-100px)] overflow-y-auto p-4 space-y-4">
					<TabPanel>
						<SearchResults />
					</TabPanel>
					<TabPanel></TabPanel>
				</div>
			</Tabs>
		</div>
	);
};

export default BarangayHome;
