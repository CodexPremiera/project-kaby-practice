import TopSection from "@/components/top_section/TopSection";
import BarangayDesk from "@/features/BarangayDesk";
import CitizenDesk from "@/features/CitizenDesk";
import { ReactNode } from "react";

const Page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<div className="flex-1">
				<TopSection title="Barangay Account Creation" />
				<BarangayDesk />
			</div>
		</div>
	);
};

export default Page;
