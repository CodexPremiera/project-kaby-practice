import BarangayHeader from "@/components/header/BarangayHeader";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import { ReactNode } from "react";

const BarangayLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col w-screen h-screen overflow-hidden">
			<BarangayHeader />

			{/* Main Content */}
			<div className="flex flex-row flex-1 sm:ml-[75px] h-full">
				<BarangayMainbar />
				<div className="flex-1 overflow-y-auto rounded-[20px] bg-primary sm:px-16 sm:py-8">
					{children}
				</div>
			</div>
		</div>
	);
};

export default BarangayLayout;
