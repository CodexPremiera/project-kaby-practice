"use server";

import { createClient } from "@/utils/supabase/server";
import AuthenticationService from "../../../../../services/AuthenticationService";
import CitizenService from "../../../../../services/CitizenService";
import { NextResponse } from "next/server";
import UserService from "../../../../../services/UserService";
import TemporaryAccountService from "@/services/TemporaryAccountService";

export async function POST(request) {
	const supabase = await createClient();
	const temporaryAccountService = new TemporaryAccountService(supabase);
	// const authService = new AuthenticationService(supabase);
	// const citizenService = new CitizenService(supabase);
	// const userService = new UserService(supabase);

	try {
		const body = await request.json();
		const {
			first_name,
			last_name,
			email,
			barangay,
			// password,
			// confirm_password,
		} = body;

		const data = await temporaryAccountService.createTemporaryAccount({
			first_name,
			last_name,
			email,
			barangay,
		});

		// const { data, error } = await authService.registerUser({
		// 	email,
		// 	password,
		// 	confirm_password,
		// });

		// if (error) {
		// 	return NextResponse.json({ error: error.message }, { status: 400 });
		// }

		// let user_id = data.user.id;

		// const { data: userData, error: userError } = await userService.createUser({
		// 	user_id,
		// 	role: "citizen",
		// });

		// if (userError) {
		// 	return NextResponse.json({ error: userError.message }, { status: 400 });
		// }

		// console.log("dataaa2", userData);
		// user_id = userData.id;

		// const { data: citData, error: citError } =
		// 	await citizenService.createCitizenProfile({
		// 		first_name,
		// 		last_name,
		// 		barangay,
		// 		user_id,
		// 	});

		// if (citError) {
		// 	return NextResponse.json({ error: citError.message }, { status: 400 });
		// }

		// console.log(citData, "citdata");

		return NextResponse.json(data);


	} catch (err) {
		console.error("Unexpected error:", err);
		return NextResponse.json(
			{ error: err.message || "Unexpected server error" },
			{ status: 500 }
		);
	}
}
