import { ReactNode } from "react";

const ServiceViewLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col sm:flex-row gap-4">
			<div className="flex-4 w-full">{children}</div>
		</div>
	);
};

export default ServiceViewLayout;
