import { NextResponse } from "next/server";
import BarangayService from "../../../services/BarangayService";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function GET() {
	const barangayService = new BarangayService(supabase);

	try {
		const barangays = await barangayService.getAllBarangays();
		return NextResponse.json({ data: barangays });
	} catch (err) {
		return NextResponse.json({ error: err.message, data: [] }, { status: 500 });
	}
}
