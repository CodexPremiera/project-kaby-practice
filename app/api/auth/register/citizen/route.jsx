"use server";

import { createClient } from "@/utils/supabase/server";
import AuthenticationService from "../../../../../services/AuthenticationService";
import CitizenService from "../../../../../services/CitizenService";
import { NextResponse } from "next/server";
import UserService from "../../../../../services/UserService";

export async function POST(request) {
	const supabase = await createClient();
	const authService = new AuthenticationService(supabase);
	const citizenService = new CitizenService(supabase);
	const userService = new UserService(supabase);
	try {
		const body = await request.json();
		const {
			first_name,
			last_name,
			email,
			barangay,
			password,
			confirm_password,
		} = body;

		const { data, error } = await authService.registerUser({
			email,
			password,
			confirm_password,
		});
		if (error) {
			throw NextResponse.json(error.message);
		}
		var user_id = data.user.id;

		const { data: data2, error: error2 } = await userService.createUser({
			user_id,
			role: "citizen",
		});
		console.log("dataaa2", data2);
		user_id = data2.id;

		const { data: citData, error: citError } =
			await citizenService.createCitizenProfile({
				first_name,
				last_name,
				barangay,
				user_id,
			});
		console.log(citData, "citdata");
		return NextResponse.json(citData);
	} catch (err) {
		console.error("Unexpected error:", err);
		return new Response(JSON.stringify({ error: "Unexpected error" }), {
			status: 500,
		});
	}
}
