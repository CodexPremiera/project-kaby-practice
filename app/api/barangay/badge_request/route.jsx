import ServiceService from "@/services/ServiceService";
import AuthenticationService from "@/services/AuthenticationService";
import RequestService from "@/services/RequestService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import CitizenService from "@/services/CitizenService";
import BarangayService from "@/services/BarangayService";

export async function GET() {
	const supabase = await createClient();

	const authService = new AuthenticationService(supabase);
	const serviceService = new ServiceService(supabase);
	const requestService = new RequestService(supabase);

	const userId = await authService.loggedInUserId();
	if (!userId)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// Get MonthlyBadge logs for this barangay
	const { data: badgeLogs, error: badgeError } = await supabase
		.from("MonthlyBadge")
		.select("citizen_id, service_id")
		.eq("barangay_id", userId);

	if (badgeError)
		return NextResponse.json({ error: badgeError.message }, { status: 500 });

	const givenBadgesSet = new Set(
		badgeLogs?.map((b) => `${b.citizen_id}|${b.service_id}`)
	);
	// get services eligible for badges
	const services = await serviceService.getAllEligibleForBadgesServices(userId);
	// get requests, exclude those already in MonthlyBadge
	const requests = await Promise.all(
		services.map(async (service) => {
			const reqs = await requestService.getRequestsByServiceId(
				service.id,
				"Completed"
			);
			return reqs
				.filter((r) => {
					const key = `${r.customer_id}|${service.id}`;
					return !givenBadgesSet.has(key);
				})
				.map((r) => ({
					...r,
					service_title: service.title,
				}));
		})
	);

	const flattened = requests.flat();

	return NextResponse.json(flattened);
}

//API for updating and decrementing badges for both citizen and barangay
export async function PUT(request) {
	const supabase = await createClient();
	const citizenService = new CitizenService(supabase);
	const barangayService = new BarangayService(supabase);

	try {
		const { customer_id, owner_id } = await request.json();
		console.log("Customer ID:", customer_id);
		console.log("Owner ID:", owner_id);

		// Increment badges for citizen
		const citizenData =
			await citizenService.incrementCitizenBadges(customer_id);

		// Give badge (Decrement Barangay Stock and Increment Barangay Given)
		const barangayData = await barangayService.giveBadge(owner_id);

		return NextResponse.json({
			citizenData,
			barangayData,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

//Store the records in my Monthly Badge (barangay_id, citizen_id, date_given, status)

export async function POST(request) {
	const supabase = await createClient();

	try {
		const { citizen_id, barangay_id, service_id, date_given, status } =
			await request.json();

		const { data, error } = await supabase.from("MonthlyBadge").insert([
			{
				citizen_id,
				barangay_id,
				service_id,
				date_given,
				status,
			},
		]);

		if (error) throw error;

		return NextResponse.json({ data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
