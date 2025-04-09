import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import { ReactNode } from "react";

const BarangayLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row sm:flex-col md:flex-col">
			{/* Fixed Mainbar (Sidebar) */}
			<div>
				<BarangayMainbar />
			</div>

			{/* Main Content Area */}
			<div className="h-full w-screen mb-[75px] text-white p-4 fixed sm:w-full sm:h-screen sm:fixed sm:ml-[75px] sm:flex sm:justify-center">
				{/* Main content goes here */}
			</div>
		</div>
	);
};

export default BarangayLayout;
