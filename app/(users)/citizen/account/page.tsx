import TopSection from "@/components/top_section/TopSection";
import { ReactNode } from "react";

const Page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<div className="flex-1">
				<TopSection title="Account Settings" />
			</div>
		</div>
	);
};

export default Page;
