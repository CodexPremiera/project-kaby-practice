import { NextResponse } from "next/server";
// import supabase  from "@/lib/supabaseClient"; // or however you import this
// import  {authService}  from "./services/AuthService"; // nioajsnfipasf
// import  {userService}  from "./services/UserService"; //asnfoapmaps
// import { createClient } from '../utils/supabase/server'

import AuthenticationService from "../../../../services/AuthenticationService";
import UserService from "../../../../services/UserService";


import { createClient } from '@/utils/supabase/server'
const userService = new UserService();

// const supabase = createClient();
export async function POST(req) {
	console.log("logging in");
	try {
		const body = await req.json();
		const supabase = await createClient();
		
		const authService = new AuthenticationService(supabase);
		const { username, password } = body;
		const email = username;

		// const { data, error } = await supabase.signInUser({ email, password });
        const { data, error } = await authService.signInUser({ email, password });
        // const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			console.log(error);
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
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
		return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
	}
}

export async function GET(req) {
	return NextResponse.json({ hello: "hello" });
}
