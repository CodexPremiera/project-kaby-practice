import React, { useState } from "react";
import Remarks from "./Remarks";
import Chat from "./Chat";
import Details from "./Details";
import { Button } from "@/components/ui/button";
import {getCustomerName, ServiceRequest} from "@/lib/clients/RequestServiceClient";
import { X as CloseIcon } from 'lucide-react';
import SwitchTab from "@/components/ui/tabs/SwitchTab";
import {useUser} from "@/app/context/UserContext";
import {getPublicUrl} from "@/utils/supabase/storage";
import Image from "next/image";


interface RequestSheetProps {
	request: ServiceRequest;
	onClose?: () => void;
}

type TabOption = "Details" | "Remarks" | "Chat";

const RequestSheet = ({ request, onClose }: RequestSheetProps	) => {
	const [activeTab, setActiveTab] = useState<TabOption>("Remarks");
	const user = useUser();

	const tabs: TabOption[] = ["Details", "Remarks", "Chat"];

	const renderContent = () => {
		switch (activeTab) {
			case "Details":
				return <Details request={request} />;
			case "Remarks":
				return <Remarks request={request} />;
			case "Chat":
				return <Chat request={request} />;
			default:
				return null;
		}
	};

	return (
		<>
			<div
				className="flex flex-col py-4 fixed bottom-0 md:right-12 right-0 z-50 w-full md:w-[450px] h-full md:h-[600px] background-1 rounded-t-xl shadow-xl border border-light-color overflow-hidden">
					<div className="flex background-1 justify-between items-center pl-5 pr-2 mb-4">
						<div className="flex gap-3 font-semibold items-center">
							{user.userId === request.owner_id ? (
								<>
									<Image
										src={
											request.customer_photo
												? getPublicUrl(
													request.customer_photo,
													"profile-pictures"
												)
												: "/default-image.jpg"
										}
										alt={`${request.customer_fname ?? "User"} image`}
										width={36}
										height={36}
										className="object-cover w-8 h-8 rounded-full border border-light-color"
									/>
									<span>{request.customer_fname} {request.customer_lname}</span>
								</>
							) : (
								<>
									<Image
										src={
											request.service_photo
												? getPublicUrl(
													request.service_photo,
													"services-pictures"
												)
												: "/default-image.jpg"
										}
										alt={`${request.customer_fname ?? "User"} image`}
										width={36}
										height={36}
										className="object-cover w-12 h-8 rounded-lg border border-light-color"
									/>
									<span>
										{request.service_title}
									</span>
								</>
							)}
						</div>

						<Button
							variant="clear"
							size=""
							className="rounded-full"
							onClick={onClose}
						>
							<CloseIcon size={8}/>
						</Button>
					</div>

				{/* Tabs */}
				<nav className="flex gap-4 border-b border-gray-200 text-primary-1 px-3">
					{tabs.map((tab) => (
						<SwitchTab
							key={tab}
							className="font-normal px-2"
							active={activeTab === tab}
							onClick={() => setActiveTab(tab)}
						>{tab}</SwitchTab>
					))}
				</nav>

				{/* Tab Content container grows to fill remaining space */}
				<div className="flex-1 overflow-hidden">
					{renderContent()}
				</div>
			</div>
		</>
	);
};

export default RequestSheet;
