import ServiceService from "@/services/ServiceService";
import UserService from "@/services/UserService";
import AuthenticationService from "@/services/AuthenticationService";
import CitizenService from "@/services/CitizenService";
import BarangayService from "@/services/BarangayService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
	const supabase = await createClient();

	const authService = new AuthenticationService(supabase);
	const userService = new UserService(supabase);
	const serviceService = new ServiceService(supabase);
	const citizenService = new CitizenService(supabase);
	const barangayService = new BarangayService(supabase);

	const user_id = await authService.loggedInUserId();
	const role = await userService.getUserRole(user_id);

	if (role === "citizen") {
		const barangayID = await citizenService.getCitBarangayIdOnly(user_id);
		const getbarangayUserID =
			await barangayService.getUserIDsByBarangayId(barangayID);

		// Extract only user_id strings
		const barangayUserID = getbarangayUserID.map((user) => user.user_id);
		const services = await serviceService.getFrontlineServices(barangayUserID);
		return NextResponse.json(services);
	} else if (role === "barangay") {
		const services = await serviceService.getFrontlineServices(user_id);
		return NextResponse.json(services);
	}
}
