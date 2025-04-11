import BarangayHeader from "@/components/header/BarangayHeader";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import { ReactNode } from "react";

const BarangayLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row sm:flex-col md:flex-col">
			{/* Main Bar Area */}
			<BarangayMainbar />
			{/* Main Content Area */}
			<div className="w-full fixed pb-[75px] text-black sm:mb-0 sm:h-full sm:ml-[75px] sm:flex-row sm:w-auto">
				<div>
					<BarangayHeader />
				</div>

				<div className="mt-[65px]">{children}</div>
			</div>
		</div>
	);
};

export default BarangayLayout;
