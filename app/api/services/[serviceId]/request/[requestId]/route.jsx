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
