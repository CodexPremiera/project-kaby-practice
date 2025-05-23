import { NextResponse } from "next/server";
import CitizenService from "@/services/CitizenService";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function GET() {
	const citizenService = new CitizenService(supabase);

	try {
		const citizens = await citizenService.getAllCitizens();
		return NextResponse.json({ data: citizens });
	} catch (err) {
		return NextResponse.json({ error: err.message, data: [] }, { status: 500 });
	}
}
