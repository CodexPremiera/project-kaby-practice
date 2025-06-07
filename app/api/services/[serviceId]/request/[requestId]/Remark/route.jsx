"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import TransactionRemarkService from "@/services/TransactionRemarkService";

export async function GET(req, context) {
	const { requestId  } = await context.params;
	console.log("REQUEST ID:", requestId );

	const supabase = await createClient();
	const transactionRemarkService = new TransactionRemarkService(supabase);

	try {
		const remarks = await transactionRemarkService.getRemarksByRequestId(
			requestId
		);
		return NextResponse.json({ remarks });
	} catch (error) {
		console.error("Error fetching service requests:", error);
		return NextResponse.json(
			{ error: "Failed to fetch service requests" },
			{ status: 500 }
		);
	}
}

export async function POST(req, context) {
	const { requestId } = context.params;
	const body = await req.json();

	const supabase = await createClient();
	const transactionRemarkService = new TransactionRemarkService(supabase);

	try {
		const newRemark = await transactionRemarkService.createRemark({
			request_id: requestId,
			content: body.content,
			sent_at: new Date().toISOString(),
		});

		return NextResponse.json({ remark: newRemark });
	} catch (error) {
		console.error("Error sending message:", error);
		return NextResponse.json({
			error: "Failed to send message" },
			{ status: 500 }
		);
	}
}

