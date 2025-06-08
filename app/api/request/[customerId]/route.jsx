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