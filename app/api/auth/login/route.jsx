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

		// const { data, error } = await supabase.signInUser({ email, password });
		// const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		const { data, error } = await authService.signInUser({ email, password });

		if (error) {
			// console.log(error);
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// console.log(data, "login success");

		// 🟡 Wait for session to be available (max ~1 second)
		// let session = null;
		// for (let i = 0; i < 10; i++) {
		//     console.log("Waiting for session...");
		// 	const { data: sessionData } = await supabase.auth.getSession();
		// 	if (sessionData?.session) {
		// 		session = sessionData.session;
		// 		break;
		// 	}
		// 	console.log(`Waiting for session... (${i})`);
		// 	await new Promise((r) => setTimeout(r, 100));
		// }

		// if (!session) {
		// 	console.error("Session did not become available in time");
		// 	return NextResponse.json({ error: "Session setup failed" }, { status: 500 });
		// }

		// ✅ Now safe to get user role
		// const user_id = await authService.loggedInUserId();
		// const user_id = await supabase.auth.getUser();
		// // console.log("user id", user_id);
		// const role = await userService.getUserRole();

		// console.log("User role:", role);
		// console.log("dtfaygubisdhonosadjasndol");

		// if (role === "citizen") {

		// 	revalidatePath("/citizen");
		// 	return NextResponse.json({ redirectTo: "/home" });
		// } else {
		// 	revalidatePath("/barangay");
		// 	return NextResponse.json({ redirectTo: "/barangay" });
		// }
		return NextResponse.json({ redirectTo: "/home" });
	} catch (err) {
		console.error("Login handler error:", err);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
		});
	}
}

export async function GET() {
	//Return the user role and the user ID of the login ID
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
