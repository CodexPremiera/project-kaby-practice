import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import ServiceService from "@/services/ServiceService";
// TODO: i am using repo but make service for services

//const repo = new ServiceRepo();
//export async function GET(request, {params}){
//    const profileId = (await params).profileId;
//    console.log("went here", profileId);

//    const data = await repo.getServicesByUser(profileId);
//    console.log("data", data);

//    return NextResponse.json(data);
//}

//Getting all the service detail based sa service ID?

export async function GET(request, { params }) {
	console.log("API route accessed with serviceId:", params.serviceId); // Add logging here

	const supabase = createClient();
	const serviceService = new ServiceService(supabase);
	const { serviceId } = params;
	const service = await serviceService.getById(serviceId);

	if (!service) {
		console.log("Service not found for serviceId:", serviceId); // Log if service is not found
		return NextResponse.json({ error: "Service not found" }, { status: 404 });
	}

	console.log("Fetched service data:", service); // Log the fetched service
	return NextResponse.json(service);
}
