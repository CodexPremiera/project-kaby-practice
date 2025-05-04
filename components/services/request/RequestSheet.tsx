import { useState } from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import Remarks from "./Remarks";
import Chat from "./Chat";
import { Button } from "@/components/ui/button";

interface Profile {
	id: string;
	name: string;
	address: string;
	image: string;
}

interface RequestSheetProps {
	profile: Profile;
	onClose?: () => void;
}

type TabOption = "Remarks" | "Chat";

const RequestSheet: React.FC<RequestSheetProps> = ({ profile, onClose }) => {
	const [activeTab, setActiveTab] = useState<TabOption>("Remarks");

	const tabs: TabOption[] = ["Remarks", "Chat"];

	const renderContent = () => {
		switch (activeTab) {
			case "Remarks":
				return <Remarks profile={profile} />;
			case "Chat":
				return <Chat profile={profile} />;
			default:
				return null;
		}
	};

	return (
		<div className="flex flex-col w-full">
			<div className="flex bg-gray-200 justify-between items-center py-2">
				<div className="font-semibold px-4">{profile.name}</div>
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
			<nav className="flex gap-6 border-b border-gray-200 pl-4">
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
			<div className="mt-4 px-4">{renderContent()}</div>
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
