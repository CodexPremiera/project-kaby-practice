"use client"

import React, {useState} from 'react';
import NameAndIdentity from "@/components/settings/citizens/name_and_identity";
import Demographics from "@/components/settings/citizens/demographics";
import Residence from "@/components/settings/citizens/residence";
import ContactDetails from "@/components/settings/citizens/contact_details";
import PasswordAndSecurity from "@/components/settings/citizens/password_and_security";
import SwitchTab from "@/components/ui/tabs/SwitchTab";


function Page(props) {
	const [activeTab, setActiveTab] = useState("Name and identity");

	const renderActiveTab = () => {
		switch (activeTab) {
			case "Name and identity":
				return <NameAndIdentity />;
			case "Demographics":
				return <Demographics />;
			case "Residence":
				return <Residence />;
			case "Contact details":
				return <ContactDetails />;
			case "Password and security":
				return <PasswordAndSecurity />;
			default:
				return null;
		}
	};

	return (
		<div className="flex min-h-screen relative">
			{/* content */}
			<div className="main flex items-start w-full min-h-full mx-auto lg:ml-[40px] xl:ml-[72px]">

				<div className="setting_tab hidden lg:flex flex-col flex-shrink-0 sticky top-0 justify-center items-start gap-6 w-[200px] pt-30">
					{[
						"Name and identity",
						"Demographics",
						"Residence",
						"Contact details",
						"Password and security"
					].map((tab) => (
						<SwitchTab
							key={tab}
							onClick={() => setActiveTab(tab)}
							active = {activeTab === tab}
						>
							{tab}
						</SwitchTab>
					))}
				</div>

				<div className="flex w-full pt-20 lg:pt-30 max-xl:justify-center">
					<div className="flex flex-col gap-6 w-full max-w-[720px] mx-6 xl:ml-40 2xl:ml-50">
						{renderActiveTab()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page;