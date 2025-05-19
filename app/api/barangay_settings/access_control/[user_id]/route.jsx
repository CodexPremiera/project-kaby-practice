import { NextResponse } from "next/server";
import BarangayAppointmentService from "../../../../../services/BarangayAppointmentService";
import CitizenService from "@/services/CitizenService";
import { createClient } from "@/utils/supabase/server";

export async function GET(request,{params}) {
    const {user_id} = await params;
    const supabase = await createClient();
    const citizenService = new CitizenService(supabase);



    try {
        const data = await citizenService.getCitizensByBarangayId(user_id);
        return NextResponse.json({ data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}