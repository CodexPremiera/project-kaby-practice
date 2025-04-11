"use client";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Dashboard from "./Dashboard";
import CitizenVerification from "./CitizenVerification";
import BadgeRequest from "./BadgeRequest";
import ReportedUser from "./ReportedUser";

const CitizenDesk = () => {
	return (
		<div>
			<div className="bg-gray-100 text-white p-4">
				<h2 className="h4 font-normal mx-4 text-gray">Citizen Desk</h2>
			</div>

			<Tabs selectedTabClassName="border-b-2 border-secondary text-secondary">
				<TabList className="flex space-x-6 mt-4 mx-4 border-b border-gray-200">
					<Tab className="tab-style">Dashboard</Tab>
					<Tab className="tab-style">Citizen Verification</Tab>
					<Tab className="tab-style">Badge Request</Tab>
					<Tab className="tab-style">Reported User</Tab>
				</TabList>

				<div className="max-h-[calc(100vh-100px)] overflow-y-auto p-4 space-y-4">
					<TabPanel>
						<Dashboard />
					</TabPanel>
					<TabPanel>
						<CitizenVerification />
					</TabPanel>
					<TabPanel>
						<BadgeRequest />
					</TabPanel>
					<TabPanel>
						<ReportedUser />
					</TabPanel>
				</div>
			</Tabs>
		</div>
	);
};

export default CitizenDesk;
