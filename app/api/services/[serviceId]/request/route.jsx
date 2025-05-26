"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import RequestService from "@/services/RequestService";

export async function GET(req, context) {
	const { serviceId } = await context.params;
	console.log("SERVICE ID:", serviceId);

	const supabase = await createClient();
	const requestService = new RequestService(supabase);

	const { searchParams } = new URL(req.url);
	const status = searchParams.get("tab");
	console.log("this is the status", status);

	try {
		const requests = await requestService.getRequestsByServiceId(
			serviceId,
			status
		);
		return NextResponse.json({ requests });
	} catch (error) {
		console.error("Error fetching service requests:", error);
		return NextResponse.json(
			{ error: "Failed to fetch service requests" },
			{ status: 500 }
		);
	}
}
