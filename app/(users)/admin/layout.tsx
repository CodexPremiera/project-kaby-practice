import AdminHeader from "@/components/header/AdminHeader";
import BarangayHeader from "@/components/header/BarangayHeader";
import AdminMainbar from "@/components/mainbar/AdminMainbar";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import { ReactNode } from "react";

const BarangayLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col w-screen h-screen overflow-hidden">
			<AdminHeader />

			{/* Main Content */}
			<div className="flex flex-row flex-1 sm:ml-[75px] h-full">
				<AdminMainbar />
				<div className="flex-1 overflow-y-auto rounded-[20px] bg-primary sm:px-16 sm:py-8">
					{children}
				</div>
			</div>
		</div>
	);
};

export default BarangayLayout;
