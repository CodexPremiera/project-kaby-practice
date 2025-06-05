import AuthenticationService from "@/services/AuthenticationService";
import UserService from "@/services/UserService";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
	console.log("logging in");
	console.log(req, "hello world");
	try {
		const body = await req.json();
		const supabase = await createClient();

		const authService = new AuthenticationService(supabase);
		const { username, password } = body;
		const email = username;
		const { data, error } = await authService.signInUser({ email, password });

		if (error) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		return NextResponse.json({ redirectTo: "/home" });
	} catch (err) {
		console.error("Login handler error:", err);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
		});
	}
}

export async function GET() {
	try {
		const supabase = await createClient();
		const authService = new AuthenticationService(supabase);
		const userService = new UserService(supabase);

		const user_id = await authService.loggedInUserId();
		const role = await userService.getUserRole(user_id);

		return NextResponse.json({ role, user_id });
	} catch (err) {
		console.error("Failed to fetch logged-in user ID:", err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
