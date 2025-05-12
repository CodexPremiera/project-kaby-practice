import { NextResponse } from "next/server";
import BarangayService from "../../../services/BarangayService";
import { createClient } from "@supabase/supabase-js"; 

export async function GET() {
	const supabase = await createClient();
	const barangayService = new BarangayService(supabase);

	try {
		const barangays = await barangayService.getAllBarangays();
		return NextResponse.json({ data: barangays });
	} catch (err) {
		return NextResponse.json({ error: err.message, data: [] }, { status: 500 });
	}
}
