import BarangayHeader from "@/components/header/BarangayHeader";
import CitizenHeader from "@/components/header/CitizenHeader";
import CitizenMainbar from "@/components/mainbar/CitizenMainbar";
import { ReactNode } from "react";

const CitizenLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row sm:flex-col md:flex-col">
			{/* Main Bar Area */}
			<CitizenMainbar />
			{/* Main Content Area */}
			<div className="h-screen w-full mb-[75px] text-black fixed sm:h-full sm:ml-[75px] sm:flex-row">
				<div>
					<CitizenHeader />
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default CitizenLayout;
