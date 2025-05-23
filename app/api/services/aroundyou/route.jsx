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

	const userId = await authService.loggedInUserId();
	const role = await userService.getUserRole(userId);
	const citizens = await citizenService.getAllCitizens();
	
	let barangayId = null;
	if (role === "citizen") {
		barangayId = await citizenService.getCitBarangayIdOnly(userId);
	} else if (role === "barangay") {
		barangayId = await barangayService.getIDByUserID(userId);
	}
	// Get citizen user IDs under the barangay
	const citizenUserIds = await citizenService.getAllCitizenProfiles(barangayId);
	// Get services owned by those citizen user IDs
	const services = await serviceService.getAroundYouServices(citizenUserIds);
	const enrichedServices = services.map((services) => {
		const profile = citizens.find((c) => c.user_id === services.owner);
		return {
			...services,
			profile,
			ownerName: profile
				? `${profile.first_name} ${profile.last_name}`
				: services.owner,
		};
	});

	return NextResponse.json(enrichedServices);
}
