"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import RequestService from "@/services/RequestService";

export async function GET(request, { params }) {
	const supabase = await createClient();
	const requestService = new RequestService(supabase);

	const { customerId: customerId } = params;

	const requests = await requestService.getRequestByCustomer(customerId);

	if (!requests || requests.length === 0) {
		return NextResponse.json({ error: "No requests found" }, { status: 404 });
	}

	console.log("Fetched customer requests:", requests);

	return NextResponse.json({ requests });
}

// PUT — bulk cancel requests for a customer
export async function PUT(request, { params }) {
	const supabase = await createClient();
	const requestService = new RequestService(supabase);

	const { customerId } = params;

	try {
		const { ids } = await request.json();

		if (!ids || !Array.isArray(ids) || ids.length === 0) {
			return NextResponse.json(
				{ error: "Invalid or missing ids." },
				{ status: 400 }
			);
		}

		// Bulk update status to 'Cancelled'
		const updatePromises = ids.map(async (id) => {
			const updated = await requestService.updateRequest(id, {
				status: "Canceled",
			});
			return updated;
		});

		const results = await Promise.all(updatePromises);

		return NextResponse.json({
			message: "Requests cancelled successfully.",
			updated: results,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to cancel requests." },
			{ status: 500 }
		);
	}
}
