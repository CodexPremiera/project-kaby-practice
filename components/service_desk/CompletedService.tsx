import ActiveServiceCard from "@/components/service_desk/ActiveCard";
import InactiveServiceCard from "@/components/service_desk/InactiveCard";
import { Button } from "@/components/ui/button";
import React from "react";

const CompletedService = ({ count = 10 }: { count?: number }) => {
	return (
		<div className="py-6 px-8">
			<div className="flex justify-between items-center px-4 mb-4">
				<h2 className="h5">Completed Services</h2>
			</div>

			<div
				className="
					grid 
					justify-center
					gap-6
					grid-cols-1 
					sm:grid-cols-2 
					lg:grid-cols-4
					max-w-screen-xl 
					mx-auto
					justify-items-center
				"
			>
				{Array.from({ length: count }).map((_, index) => (
					<InactiveServiceCard key={index} />
				))}
			</div>
		</div>
	);
};

export default CompletedService;
