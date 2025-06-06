import { NextResponse } from "next/server";
import BarangayAppointmentService from "../../../../services/BarangayAppointmentService";
import AuthenticationService from "@/services/AuthenticationService";
import UserService from "@/services/UserService";
import BarangayService from "@/services/BarangayService";
import { createClient } from "@/utils/supabase/server";

import supabaseAdmin from "@/utils/supabase/admin";

export async function POST(request) {
	const supabase = await createClient();
	const authService = new AuthenticationService(supabase);
	const userService = new UserService(supabase);
	// const brgyAppService = new BarangayAppointmentService(supabase);
	const barangayService = new BarangayService(supabase);

	// temporary solution: use gmail as gmail and password

	try {
		const body = await request.json();
		// console.log("this is body: ", body);
		const {
			barangay,
			city,
			region,
			barangayName,
			email,
			password,
			confirmPassword,
		} = body;
		const address = barangay;
		// const password = email
		if (password !== confirmPassword) {
			return NextResponse.json(
				{ error: "Password and Confirm Password do not match" },
				{ status: 400 }
			);
		}
		// const {data, error} = await authService.registerUser({email,password}); // this is the that should create the user without using signUo()
		// ========================= i will remove this ============================
		// const { data, error } = await supabaseAdmin.auth.admin.createUser({
		// 	email,
		// 	password,
		// 	email_confirm: true,
		// });
		// console.log("this is data", data);
		const account = await authService.createAccount({email:email});
    	const user_id = account.data.user.id;
		

		// ========================================================================
		const { data: userData, error: userError } = await userService.createUser({
			user_id: user_id,
			role: "barangay",
		});
		console.log("this is userData", userData);

		// Create barangay profile (note: now passing user_id)
		const brgyDetails = await barangayService.createBarangayProfile({
			address: `${barangay}, ${city}, ${region}`,
			badge_stock: 1000,
			barangayName: barangayName,
			user_id: user_id,
		});

		if (!brgyDetails) {
			return NextResponse.json(
				{ error: "Failed to create Barangay profile." },
				{ status: 500 }
			);
		}

		return NextResponse.json({ redirectTo: "/barangay_desk" });
	} catch (err) {
		// console.log(err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

export async function GET(request) {
	const supabase = await createClient();
	const brgyAppService = new BarangayAppointmentService(supabase);

	const token = request.cookies.get("token");

	try {
		const data = await brgyAppService.getAllAppointments();
		return NextResponse.json({ data: data });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

export async function PUT(request) {
	const supabase = await createClient();
	const brgyAppService = new BarangayAppointmentService(supabase);
	// console.log("this is req",request);
	try {
		const body = await request.json();
		// console.log("this is body: ", body);
		const data = await brgyAppService.updateAppointment(body);
		// console.log("data of put", data);
		return NextResponse.json({ redirectTo: "/barangay_desk" });
	} catch (err) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}