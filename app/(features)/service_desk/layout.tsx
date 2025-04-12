import TopSection from "@/components/TopSection";
import { ReactNode } from "react";

const ServiceDeskLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col w-full h-full">
			<TopSection title="Service Desk" />
			<div className="flex-1 overflow-y-auto  mt-[55px]">{children}</div>
		</div>
	);
};

export default ServiceDeskLayout;
