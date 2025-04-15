import AdminHeader from "@/components/header/AdminHeader";
import BarangayHeader from "@/components/header/BarangayHeader";
import AdminMainbar from "@/components/mainbar/AdminMainbar";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row w-screen h-screen overflow-hidden">
			{/* Sidebar */}
			<AdminMainbar />

			{/* Main Content */}
			<div className="flex flex-col flex-1 sm:ml-[75px] h-full">
				{/* Hide the header on phone */}
				<div className="hidden sm:block">
					<AdminHeader />
				</div>

				{/* Remove the margin top on phone */}
				<div className="mt-0 flex-1 overflow-y-auto">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
