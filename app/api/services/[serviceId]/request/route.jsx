"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import RequestService from "@/services/RequestService";


export async function GET(req, { params }) {
	const supabase = await createClient();
	const requestService = new RequestService(supabase);

	const { serviceId: serviceId } = await params;

	const { searchParams } = new URL(req.url);
	const status = searchParams.get("tab");

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

