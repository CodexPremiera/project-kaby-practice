"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import RequestService from "@/services/RequestService";
import CitizenService from "@/services/CitizenService";
import ServiceService from "@/services/ServiceService";
export async function GET(req, context) {
	const { serviceId } = await context.params;
	console.log("SERVICE ID:", serviceId);

	const supabase = await createClient();
	const requestService = new RequestService(supabase);
	const citizenService = new CitizenService(supabase);
	const serviceService = new ServiceService(supabase);

	const { searchParams } = new URL(req.url);
	const status = searchParams.get("tab");
	console.log("this is the status", status);

	try {
		const requests = await requestService.getRequestsByServiceId(
			serviceId,
			status
		);

		// Fetch all citizens once
		const citizens = await citizenService.getAllCitizens();

		// Fetch all services once
		const services = await serviceService.getAllServices();

		const requestsWithCustomerAndServiceDetails = requests.map((request) => {
			let customer_name, customer_photo, customer_address;
			// Match citizen by id
			const citizen = citizens.find((c) => c.id === request.customer_id);
			if (citizen) {
				customer_name = `${citizen.first_name} ${citizen.last_name}`;
				customer_photo = citizen.profile_pic || "";
				customer_address = citizen.barangay || "";
			}

			return {
				...request,
				customer_name,
				customer_photo,
				customer_address,
			};
		});

		return NextResponse.json({
			requests: requestsWithCustomerAndServiceDetails,
		});
	} catch (error) {
		console.error("Error fetching service requests:", error);
		return NextResponse.json(
			{ error: "Failed to fetch service requests" },
			{ status: 500 }
		);
	}
}
