import TopSection from "@/components/top_section/TopSection";
import CitizenDesk from "@/features/CitizenDesk";
import Tracker from "@/features/Tracker";
import { ReactNode } from "react";

const Page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<div className="flex-1">
				<TopSection title="Tracker" />
				<Tracker />
			</div>
		</div>
	);
};

export default Page;
