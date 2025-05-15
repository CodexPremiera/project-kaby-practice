"use server";

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import ServiceService from "@/services/ServiceService";
import AuthenticationService from "@/services/AuthenticationService";
import UserService from "@/services/UserService";
import CitizenService from "@/services/CitizenService";

export async function GET() {
	const supabase = await createClient();
	const authService = new AuthenticationService(supabase);
	const serviceService = new ServiceService(supabase);
	const userService = new UserService(supabase);
	const citizenService = new CitizenService(supabase);

	try {
		// Get current logged-in user ID
		const user_id = await authService.loggedInUserId();
		if (!user_id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Get user role
		const role = await userService.getUserRole(user_id);
		console.log("User role:", role);

		if (role === "citizen") {
			// Get citizen profile
			const citizen = await citizenService.getCitizenById(user_id);
			if (!citizen) {
				return NextResponse.json(
					{ error: "Citizen profile not found" },
					{ status: 404 }
				);
			}

			const barangayName = citizen.barangay;

			// Get services by barangay name
			const services = await serviceService.getServicesByBarangay(barangayName);

			return NextResponse.json({ services });
		} else if (role === "barangay") {
			// Get barangay profile directly via user_id
			const barangayProfile =
				await userService.getBarangayProfileByUserId(user_id); // assuming you have this
			if (!barangayProfile) {
				return NextResponse.json(
					{ error: "Barangay profile not found" },
					{ status: 404 }
				);
			}

			const barangayName = barangayProfile.barangayName;

			// Get services by barangay name
			const services = await serviceService.getServicesByBarangay(barangayName);

			return NextResponse.json({ services });
		} else {
			return NextResponse.json({ error: "Invalid role" }, { status: 400 });
		}
	} catch (error) {
		console.error("Error fetching services:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

//match the user_id to CitizenProfile user_id -> get the barangay(text)
//match barangay(text) == BarangayProfile.barangayName (text)
//BarangayProfile.user_id == userroles.id -> userroles.user_id  == Services.owner

//BarangayProfile.user_id == userroles.id -> userroles.user_id  == Services.owner
