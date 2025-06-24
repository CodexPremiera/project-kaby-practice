"use server";

import ServiceService from "@/services/ServiceService";
import BarangayService from "@/services/BarangayService";
import CitizenService from "@/services/CitizenService";
import UserService from "@/services/UserService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const supabase = await createClient();
	const serviceService = new ServiceService(supabase);
	const barangayService = new BarangayService(supabase);
	const citizenService = new CitizenService(supabase);
	const userService = new UserService(supabase);
	const { serviceId } = params;

	const service = await serviceService.getById(serviceId);

	if (!service) {
		console.log("Service not found for serviceId:", serviceId);
		return NextResponse.json({ error: "Service not found" }, { status: 404 });
	}

	console.log("Fetched service data:", service);

	// Get the owner role
	const userRole = await userService.getUserRole(service.owner);

	let owner_name = service.owner;

	// Fetch all barangays and citizens once
	const barangays = await barangayService.getAllBarangays();
	const citizens = await citizenService.getAllCitizens();

	// Depending on role, find the owner profile from the list
	if (userRole === "barangay") {
		const barangayProfile = barangays.find((b) => b.user_id === service.owner);
		if (barangayProfile) {
			owner_name = barangayProfile.barangayName;
		}
	} else if (userRole === "citizen") {
		const citizenProfile = citizens.find((c) => c.user_id === service.owner);
		if (citizenProfile) {
			owner_name = `${citizenProfile.first_name} ${citizenProfile.last_name}`;
		}
	}

	return NextResponse.json({
		...service,
		owner_name,
	});
}

// PUT: update a specific serviceID
export async function PUT(request, context) {
	const supabase = await createClient();
	const serviceService = new ServiceService(supabase);

	const { serviceId } = await context.params;
	const body = await request.json();
	console.log("\n\n\n\nbody")
	console.log(body)

	try {
		const result = await serviceService.updateService(serviceId, body);

		if (!result || result.length === 0) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		console.log("\n\n\n\nresult")
		console.log(result)
		return NextResponse.json(result);
	} catch (err) {
		console.error("Error updating post:", err.message);
		return NextResponse.json(
			{ error: "Failed to update post", message: err.message},
			{ status: 500 }
		);
	}
}

export async function DELETE(request, context) {
	const supabase = await createClient();
	const { serviceId } = context.params;

	try {
		const { data: requests, error: requestError } = await supabase
		.from("Requests")
		.select("id")
		.eq("service_id", serviceId)
		.in("status", ["Pending", "Ongoing"]);

		if (requestError) throw requestError;

		if (requests.length > 0) {
			return NextResponse.json(
				{ error: "Cannot delete service with active requests." },
				{ status: 400 }
			);
		}

		const { error: deleteError } = await supabase
		.from("Services")
		.delete()
		.eq("id", serviceId);

		if (deleteError) throw deleteError;

		return NextResponse.json({ message: "Service deleted successfully." });
	} catch (err) {
		console.error("Delete error:", err.message);
		return NextResponse.json(
			{ error: "Failed to delete service", message: err.message },
			{ status: 500 }
		);
	}
}

