import BarangayHeader from "@/components/header/BarangayHeader";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import { ReactNode } from "react";

const BarangayLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row sm:flex-col md:flex-col">
			{/* Main Bar Area */}
			<BarangayMainbar />
			{/* Main Content Area */}
			<div className="h-full w-full mb-[75px] text-black p-4 fixed sm:w-full sm:h-full sm:fixed sm:ml-[75px] mt-[65px] sm:flex ">
				{children}
			</div>
			<BarangayHeader />
		</div>
	);
};

export default BarangayLayout;
