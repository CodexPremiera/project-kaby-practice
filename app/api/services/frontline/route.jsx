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

	if (role !== "citizen" && role !== "barangay") {
		return NextResponse.json({ message: "Unauthorized role" }, { status: 403 });
	}

	const barangays = await barangayService.getAllBarangays();
	let userIds = [];

	if (role === "citizen") {
		const barangayId = await citizenService.getCitBarangayIdOnly(userId);
		const barangayUsers =
			await barangayService.getUserIDsByBarangayId(barangayId);
		userIds = barangayUsers.map((u) => u.user_id);
	} else {
		userIds = [userId];
	}

	const services = await serviceService.getFrontlineServices(userIds);

	const enrichedServices = services.map((service) => {
		const ownerId = role === "citizen" ? service.owner : userId;
		const profile = barangays.find((b) => b.user_id === ownerId);
		return {
			...service,
			profile,
			ownerName: profile ? profile.barangayName : service.owner,
		};
	});

	return NextResponse.json(enrichedServices);
}
