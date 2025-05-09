import AdminHeader from "@/components/header/AdminHeader";
import BarangayHeader from "@/components/header/BarangayHeader";
import CitizenHeader from "@/components/header/CitizenHeader";
import AdminMainbar from "@/components/mainbar/AdminMainbar";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import CitizenMainbar from "@/components/mainbar/CitizenMainbar";
import { ReactNode } from "react";
import AuthenticationService from "@/services/AuthenticationService";
import UserService from "@/services/UserService";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const authService = new AuthenticationService();
const userService = new UserService();

const GeneralLayout = async ({ children }: { children: ReactNode }) => {
	// const data = await userService.getAllUsers()
	// console.log(data, "this is user");
	const cookieStore = await cookies();
	console.log(cookieStore.getAll(), "this is cookie store");

	return (
		<div className="flex flex-col w-screen h-screen overflow-hidden">
			{/* Example static header for now */}
			<BarangayHeader />

			<div className="flex flex-row flex-1 sm:ml-[75px] h-full">
				{/* Example static sidebar */}
				<CitizenMainbar />

				<div className="flex-1 overflow-y-auto rounded-tl-[20px] sm:px-7 sm:pb-0 pb-[75px] border-light">
					{children}
				</div>
			</div>
		</div>
	);
};

export default GeneralLayout;
