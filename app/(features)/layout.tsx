import AdminHeader from "@/components/header/AdminHeader";
import BarangayHeader from "@/components/header/BarangayHeader";
import CitizenHeader from "@/components/header/CitizenHeader";
import AdminMainbar from "@/components/mainbar/AdminMainbar";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import CitizenMainbar from "@/components/mainbar/CitizenMainbar";
import { ReactNode } from "react";
import AuthenticationService from "@/services/AuthenticationService";
import UserService from "@/services/UserService";
import { createClient } from "@/utils/supabase/server";

const GeneralLayout = async ({ children }: { children: ReactNode }) => {
	const supabase = await createClient();
	const authService = new AuthenticationService(supabase);
	const userService = new UserService(supabase);

	const user_id = await authService.loggedInUserId();
	console.log("Logged in user id: ", user_id);
	const role = await userService.getUserRole(user_id);

	console.log("User role: ", role);

	let Header = null;
	let Mainbar = null;

	if (role === "admin") {
		Header = <AdminHeader />;
		Mainbar = <AdminMainbar />;
	} else if (role === "barangay") {
		Header = <BarangayHeader />;
		Mainbar = <BarangayMainbar />;
	} else if (role === "citizen") {
		Header = <CitizenHeader />;
		Mainbar = <CitizenMainbar />;
	}

	return (
		<div className="flex flex-col w-screen h-screen overflow-hidden">
			{/* Example static header for now */}
			{Header}
			{/* Example static sidebar for now */}
			<div className="flex flex-row flex-1 sm:ml-[75px] h-full">
				{/* Example static sidebar */}
				{Mainbar}

				<div className="flex-1 overflow-y-auto rounded-tl-[20px] sm:px-7 sm:pb-0 pb-[75px] border-light">
					{children}
				</div>
			</div>
		</div>
	);
};

export default GeneralLayout;
