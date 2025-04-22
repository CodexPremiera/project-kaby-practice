import BarangayHeader from "@/components/header/BarangayHeader";
import CitizenHeader from "@/components/header/CitizenHeader";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import CitizenMainbar from "@/components/mainbar/CitizenMainbar";
import { ReactNode } from "react";

const CitizenLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col w-screen h-screen overflow-hidden">
			<CitizenHeader />

			{/* Main Content */}
			<div className="flex flex-row flex-1 sm:ml-[75px] h-full">
				<CitizenMainbar />
				<div className="flex-1 overflow-y-auto rounded-[20px] bg-primary sm:px-16 sm:py-8">
					{children}
				</div>
			</div>
		</div>
	);
};

export default CitizenLayout;
