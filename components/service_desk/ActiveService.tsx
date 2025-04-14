import ActiveServiceCard from "@/components/service_desk/ActiveCard";
import { Button } from "@/components/ui/button";
import React from "react";

const ActiveService = ({ count = 4 }: { count?: number }) => {
	return (
		<div className="py-6 px-8">
			<div className="flex justify-between items-center px-4 mb-4">
				<h2 className="h5">Active Services</h2>
				<Button variant="default">Add New</Button>
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
					<ActiveServiceCard key={index} />
				))}
			</div>
		</div>
	);
};

export default ActiveService;
