import { NextResponse } from "next/server";
import MonthlyBadgeService from "@/services/MonthlyBadgeService";
import { createClient } from "@/utils/supabase/server";

export async function GET(request,{params}) {
    const { barangay_id } = await params;
    const supabase = await createClient();
    const monthServ = new MonthlyBadgeService(supabase);


    try {
        const badges = await monthServ.getBadgesByBarangayThisMonth(barangay_id);
        return NextResponse.json({ data: badges });
    } catch (err) {
        return NextResponse.json({ error: err.message, data: [] }, { status: 500 });
    }
}