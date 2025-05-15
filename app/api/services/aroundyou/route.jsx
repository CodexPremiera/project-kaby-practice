"use server";

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import ServiceService from "../../../services/ServiceService";

export async function GET() {
	// Getting all the services with the same Barangay of the current user
	const supabase = await createClient();
	const serviceService = new ServiceService(supabase);
    
	try {
		const services = await serviceService.getAllServices();
		return NextResponse.json(services);
	} catch (err) {
		console.error("Error fetching services:", err);
		return new Response(JSON.stringify({ error: "Failed to fetch services" }), {
			status: 500,
		});
	}
}
