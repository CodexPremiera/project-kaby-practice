import ViewSidebar from "@/components/services/ViewSidebar";
import BackTopSection from "@/components/services/BackTopSection";
import { ReactNode } from "react";

const ServiceViewLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col sm:flex-row gap-4">
			{/* Content area */}
			<div className="flex-4 w-full">
				<BackTopSection title="Bondy's Photography" serviceId="1" />
				{children}
			</div>
		</div>
	);
};

export default ServiceViewLayout;
