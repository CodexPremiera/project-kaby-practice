import CitizenService from "@/services/CitizenService";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { error } from "console";

export async function PUT(request, { params }) {
	// himoi daw ug increment ang badges
	console.log(params);
	// gamita daw ang params
	const { user_id } = await params;
	const supabase = await createClient();
	const citService = new CitizenService(supabase);

	// const body = await request.json();
	console.log(user_id);

	try {
		const data = await citService.incrementCitizenBadges(user_id);
		return NextResponse.json({ data: data });
	} catch {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
