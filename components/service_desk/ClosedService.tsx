import ActiveServiceCard from "@/components/service_desk/ActiveCard";
import React from "react";
import InactiveCard from "./InactiveCard";

const ClosedService = ({ count = 6 }: { count?: number }) => {
	return (
		<div
			className="
					grid 
					justify-center
					gap-6
					grid-cols-2 
					sm:grid-cols-2 
					lg:grid-cols-4
					max-w-screen-xl 
					mx-auto
					justify-items-center
                    py-4
				"
		>
			{Array.from({ length: count }).map((_, index) => (
				<InactiveCard key={index} />
			))}
		</div>
	);
};

export default ClosedService;
