import { useState } from "react";
import Remarks from "./Remarks";
import Chat from "./Chat";
import Details from "./Details";
import { Button } from "@/components/ui/button";
import {getCustomerName, ServiceRequest} from "@/lib/clients/RequestServiceClient";


interface RequestSheetProps {
	request: ServiceRequest;
	onClose?: () => void;
}

type TabOption = "Details" | "Remarks" | "Chat";

const RequestSheet = ({ request, onClose }: RequestSheetProps	) => {
	const [activeTab, setActiveTab] = useState<TabOption>("Remarks");

	const tabs: TabOption[] = ["Details", "Remarks", "Chat"];

	const renderContent = () => {
		switch (activeTab) {
			case "Details":
				return <Details profile={profile} />;
			case "Remarks":
				return <Remarks profile={request} />;
			case "Chat":
				return <Chat request={request} />;
			default:
				return null;
		}
	};

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex background-1 justify-between items-center py-2">
				<div className="font-semibold px-4">{getCustomerName(request)}</div>
				<div className="px-2">
					<Button
						variant="default"
						size="sm"
						className="rounded-full"
						onClick={onClose}
					>
						✕
					</Button>
				</div>
			</div>

			{/* Tabs */}
			<nav className="flex gap-6 border-b border-gray-200 pl-4 text-primary-1">
				{tabs.map((tab) => (
					<TabButton
						key={tab}
						label={tab}
						active={activeTab === tab}
						onClick={() => setActiveTab(tab)}
					/>
				))}
			</nav>

			{/* Tab Content */}
			<div className="mt-4 px-4 h-full">{renderContent()}</div>
		</div>
	);
};

interface TabButtonProps {
	label: string;
	active: boolean;
	onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onClick }) => (
	<button
		onClick={onClick}
		className={`text-sm px-4 py-3 border-b-2 font-medium transition-colors focus:outline-none ${
			active
				? "border-secondary text-secondary"
				: "border-transparent text-gray-600 hover:text-secondary"
		}`}
	>
		{label}
	</button>
);

export default RequestSheet;
