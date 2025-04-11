import TopSection from "@/components/TopSection";
import { ReactNode } from "react";

const AccountLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col w-full h-full">
			{/* Top Section */}
			<TopSection title="Citizen Desk" />

			{/* Scrollable Content*/}
			<div className="flex-1 overflow-y-auto  mt-[65px]">{children}</div>
		</div>
	);
};

export default AccountLayout;
