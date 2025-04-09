import BarangayHeader from "@/components/header/BarangayHeader";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import { ReactNode } from "react";

const BarangayLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row sm:flex-col md:flex-col">
			{/* Main Bar Area */}
			<BarangayMainbar />
			{/* Main Content Area */}
			<div className="h-screen w-full mb-[75px] text-black fixed sm:h-full sm:ml-[75px] sm:flex-row">
				<div>
					<BarangayHeader />
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default BarangayLayout;
