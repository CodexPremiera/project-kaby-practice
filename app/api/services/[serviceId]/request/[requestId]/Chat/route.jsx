"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import TransactionChatService from "@/services/TransactionChatService";

export async function GET(req, context) {
	const { requestId  } = await context.params;
	console.log("REQUEST ID:", requestId );

	const supabase = await createClient();
	const transactionChatService = new TransactionChatService(supabase);

	try {
		const chats = await transactionChatService.getChatsByRequestId(
			requestId
		);
		return NextResponse.json({ chats });
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
	const transactionChatService = new TransactionChatService(supabase);

	try {
		const newChat = await transactionChatService.createChat({
			request_id: requestId,
			message: body.message,
			sender_id: body.sender_id,
			sent_at: new Date().toISOString(),
		});

		return NextResponse.json({ chat: newChat });
	} catch (error) {
		console.error("Error sending message:", error);
		return NextResponse.json({
			error: "Failed to send message" },
			{ status: 500 }
		);
	}
}

