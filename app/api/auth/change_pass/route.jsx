import { createClient } from "@/utils/supabase/server";
import AuthenticationService from "@/services/AuthenticationService";
import { NextResponse } from "next/server";

export async function POST(request) {
	const supabase = await createClient();
	const authService = new AuthenticationService(supabase);
	const body = await request.json();

	try {
		const result = await authService.changeUserPassword(body.current_password, body.new_password);
		return NextResponse.json(result);
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ success: false, error: "Unexpected server error." });
	}
}
