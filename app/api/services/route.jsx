"use server";

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import ServiceService from "@/services/ServiceService";
import AuthenticationService from "@/services/AuthenticationService";
import CitizenService from "@/services/CitizenService";

export async function POST(request) {
	const supabase = await createClient();
	const serviceService = new ServiceService(supabase);
	const authService = new AuthenticationService(supabase);
	try {
		const body = await request.json();
		console.log("this is body", body);
		// Destructure 'owner' out and keep the rest
		const { owner, ...dataWithoutOwner } = body;

		// Get logged-in user ID
		const id = await authService.loggedInUserId();

		// Reconstruct body with the logged-in user as owner
		const newServiceData = {
			...dataWithoutOwner,
			owner: id,
		};
		console.log(newServiceData, "hello worlldddd");

		const serviceData = await serviceService.createService(newServiceData);
		console.log(serviceData, "servicedata");

		return NextResponse.json(serviceData);
		// return NextResponse.json(body);
	} catch (err) {
		console.error("Unexpected error:", err);
		return new Response(JSON.stringify({ error: "Unexpected error" }), {
			status: 500,
		});
	}
}

export async function GET() {
	// By default, displaying ALL Services == ALL CITIZEN Services (Only)
	const supabase = await createClient();
	const serviceService = new ServiceService(supabase);
	const citizenService = new CitizenService(supabase);

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	try {
		const services = await serviceService.getAllServices();
		const citizens = await citizenService.getAllCitizens();

		const enrichedServices = services.map((service) => {
			const profile = citizens.find((c) => c.user_id === service.owner);
			return {
				...service,
				profile,
				ownerName: profile
					? `${profile.first_name} ${profile.last_name}`
					: service.owner,
			};
		});

		return NextResponse.json(enrichedServices);
	} catch (err) {
		console.error("Error fetching services:", err);
		return new Response(JSON.stringify({ error: "Failed to fetch services" }), {
			status: 500,
		});
	}
}
