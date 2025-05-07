import CitizenDeskSidebar from "@/components/citizen_desk/CitizenDeskSidebar";
import { ReactNode } from "react";

const CitizenDeskLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col sm:flex-row gap-4">
			{/* Sidebar */}
			<div className="flex-1 w-full">
				<CitizenDeskSidebar />
			</div>

			{/* Content area */}
			<div className="flex-4 rounded-[10px] bg-white w-full">{children}</div>
		</div>
	);
};

export default CitizenDeskLayout;
