"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import RequestService from "@/services/RequestService";

export async function GET(request, { params }) {
	//Getting the specific request details
	const supabase = await createClient();
	const requestService = new RequestService(supabase);
	const { requestId } = params;

	const requests = await requestService.getById(requestId);

	if (!request) {
		return NextResponse.json({ error: "Request not found" }, { status: 404 });
	}
	console.log("Fetched service requests data:", requests);

	return NextResponse.json({
		requests,
	});
}

// PUT: update a specific request
export async function PUT(request, context) {
	const supabase = await createClient();
	const requestService = new RequestService(supabase);

	const params = await context.params;
	const { serviceId, requestId } = params;

	const body = await request.json();

	try {
		const result = await requestService.updateRequestByServiceId(
			serviceId,
			requestId,
			body
		);

		if (!result || result.length === 0) {
			return NextResponse.json({ error: "Request not found" }, { status: 404 });
		}

		return NextResponse.json(result);
	} catch (err) {
		console.error("Error updating request:", err);
		return NextResponse.json(
			{ error: "Failed to update request" },
			{ status: 500 }
		);
	}
}
