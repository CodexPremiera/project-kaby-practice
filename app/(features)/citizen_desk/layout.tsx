import TopSection from "@/components/TopSection";
import { ReactNode } from "react";

const CitizenDeskLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col w-full h-full">
			<TopSection title="Citizen Desk" />
			<div className="flex-1 overflow-y-auto  mt-[57px] bg-primary">
				{children}
			</div>
		</div>
	);
};

export default CitizenDeskLayout;
