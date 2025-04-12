import ProfileTab from "@/components/profile/ProfileTab";
import TopSection from "@/components/TopSection";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<ProfileTab />
			<div className="flex-1 overflow-y-auto ">{children}</div>
		</div>
	);
};

export default ProfileLayout;
