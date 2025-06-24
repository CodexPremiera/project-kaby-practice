// app/api/request/[requestId]/rate/route.js

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import RequestService from "@/services/RequestService";

export async function PUT(req, context) {
    const supabase = await createClient();
    const requestService = new RequestService(supabase);

    const { requestId } = context.params;
    const body = await req.json();
    const { rating } = body;

    if (typeof rating !== "number") {
        return NextResponse.json(
            { error: "Invalid or missing rating value" },
            { status: 400 }
        );
    }

    try {
        const result = await requestService.updateRequest(requestId, {
            ratings: rating,
        });

        return NextResponse.json({ request: result });
    } catch (error) {
        console.error("Error updating request rating:", error);
        return NextResponse.json(
            { error: "Failed to update request rating" },
            { status: 500 }
        );
    }
}
