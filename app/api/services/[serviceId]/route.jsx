"use server";
import ServiceService from "@/services/ServiceService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const supabase = await createClient();
	const serviceService = new ServiceService(supabase);
	const { serviceId } = params;
	const service = await serviceService.getById(serviceId);

	if (!service) {
		console.log("Service not found for serviceId:", serviceId);
		return NextResponse.json({ error: "Service not found" }, { status: 404 });
	}

	console.log("Fetched service data:", service);
	return NextResponse.json(service);
}
