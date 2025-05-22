import { NextResponse } from "next/server";
import OfficialService from "@/services/OfficialService";
import { createClient } from "@/utils/supabase/server";

export async function GET(request,{params}) {
    const {user_id} = await params;
    const supabase = await createClient();
    const officialService = new OfficialService(supabase);



    try {
        const data = await officialService.getOfficials(user_id);
        return NextResponse.json({ data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
