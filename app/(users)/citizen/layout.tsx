import BarangayHeader from "@/components/header/BarangayHeader";
import CitizenHeader from "@/components/header/CitizenHeader";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import CitizenMainbar from "@/components/mainbar/CitizenMainbar";
import { ReactNode } from "react";

const BarangayLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row w-screen h-screen overflow-hidden">
			{/* Sidebar */}
			<CitizenMainbar />

			{/* Main Content */}
			<div className="flex flex-col flex-1 sm:ml-[75px] h-full">
				{/* Hide the header on phone */}
				<div className="hidden sm:block">
					<CitizenHeader />
				</div>

				{/* Remove the margin top on phone */}
				<div className="mt-0 flex-1 overflow-y-auto">{children}</div>
			</div>
		</div>
	);
};

export default BarangayLayout;
