import TopSection from "@/components/top_section/TopSection";
import React from "react";

const page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<div className="flex-1">
				<TopSection title="Emergency List" />
			</div>
		</div>
	);
};

export default page;
