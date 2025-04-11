import BarangayHeader from "@/components/header/BarangayHeader";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import { ReactNode } from "react";

const BarangayLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row w-screen h-screen overflow-hidden">
			{/* Sidebar */}
			<BarangayMainbar />

			{/* Main Content */}
			<div className="flex flex-col flex-1 sm:ml-[75px] h-full">
				<BarangayHeader />
				<div className="mt-[65px] flex-1 overflow-y-auto scrollbar-hide">
					{children}
				</div>
			</div>
		</div>
	);
};

export default BarangayLayout;
