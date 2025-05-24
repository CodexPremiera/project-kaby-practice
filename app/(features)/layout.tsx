import AdminHeader from "@/components/header/AdminHeader";
import BarangayHeader from "@/components/header/BarangayHeader";
import CitizenHeader from "@/components/header/CitizenHeader";
import AdminMainbar from "@/components/mainbar/AdminMainbar";
import BarangayMainbar from "@/components/mainbar/BarangayMainbar";
import CitizenMainbar from "@/components/mainbar/CitizenMainbar";
import { ReactNode } from "react";
import AuthenticationService from "@/services/AuthenticationService";
import UserService from "@/services/UserService";
import CitizenService from "@/services/CitizenService";
import BarangayService from "@/services/BarangayService";
import { createClient } from "@/utils/supabase/server";
// import { UserContext } from "@/app/context/UserContext";
// import { BarangayContext } from "@/app/context/BarangayContext";
import BarangayProvider from "@/app/context/BarangayProvider";
import CitizenProvider from "@/app/context/CitizenProvider";
import {MainBarProvider} from "@/app/context/MainBarProvider";
import UserProvider from "@/app/context/UserProvider";
const GeneralLayout = async ({ children }: { children: ReactNode }) => {
	const supabase = await createClient();
	const authService = new AuthenticationService(supabase);
	const userService = new UserService(supabase);

	const user_id = await authService.loggedInUserId();
	console.log("Logged in user id: ", user_id);
	const role = await userService.getUserRole(user_id);

	const has_password = await authService.hasPassword();
	console.log("this has pass", has_password);

	console.log("User role: ", role);

	let Header = null;
	let Mainbar = null;

	let barangayData = null;
	let citizenData = null;
	if (role === "admin") {
		Header = <AdminHeader />;
		Mainbar = <AdminMainbar />;
	} else if (role === "barangay") {
		const barangayService = new BarangayService(supabase);
		const barangay = await barangayService.getBarangayFieldsByFKId(user_id);
		console.log("Barangayzz: ", barangay);
		barangayData = {
			barangayId: barangay.id,
			barangayName: barangay.barangayName,
			barangayAddress: barangay.address,
			barangayProfilePic:barangay.profile_pic,
		}
		console.log("Barangay data: ", barangayData);
		

		// conte
		Header = <BarangayHeader />;
		Mainbar = <BarangayMainbar />;
	} else if (role === "citizen") {
		const citizenService = new CitizenService(supabase);
		const barangayService = new BarangayService(supabase);
		const brgyId = await citizenService.getCitBarangayId(user_id);
		const barangay = await barangayService.getBarangayFieldsById(brgyId.barangay_id);
		barangayData = {
			barangayId: barangay.id,
			barangayName: barangay.barangayName,
			barangayAddress: barangay.address,
			barangayProfilePic:barangay.profile_pic,
			// barangayName: "test",
			// barangayAddress: "test2",
		}
		console.log("womppp womppp",user_id);

		const citizen = await citizenService.getCitByAuthenticatedId(user_id);
		console.log("womppp womppp  womppp",citizen);
		citizenData = {
			citizenId: citizen.id,
			firstName: citizen.first_name,
			lastName: citizen.last_name,
			middleName: citizen.middle_name,
			citizenProfilePic: citizen.profile_pic,
		};
		console.log("Barangay data: ", barangayData);
		console.log("brrr brr", citizenData);
		Header = <CitizenHeader />;
		Mainbar = <CitizenMainbar />;
	}
	const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
		<div className="flex flex-col w-screen min-h-screen overflow-hidden relative">
			{Header}
			<div className="flex flex-row flex-1 sm:ml-[75px] h-full">
				{Mainbar}
				<div className="flex-1 sm:rounded-tl-[20px] sm:px-7 py-6 border-light-color bg-gradient mt-16 pb-18">
					{children}
				</div>
			</div>
		</div>
	);
	return (
		<UserProvider value={{userId: user_id, role,has_password}}>
			{role === "barangay" ? (
					<BarangayProvider value={barangayData}>
						<LayoutWrapper>{children}</LayoutWrapper>
					</BarangayProvider>
				)
				: role === "citizen" && citizenData && barangayData 	 ?  (
            <CitizenProvider value={citizenData}>
							<BarangayProvider value={barangayData}>
								<LayoutWrapper>{children}</LayoutWrapper>
							</BarangayProvider>
						</CitizenProvider>
			)
			 : (
			<LayoutWrapper>{children}</LayoutWrapper>
			)}
		</UserProvider>
	);
};


export default GeneralLayout;
