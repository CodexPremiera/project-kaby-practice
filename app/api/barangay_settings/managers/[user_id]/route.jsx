// OPTIMIZATION PURPOSES: USE VIEWS https://supabase.com/blog/postgresql-views
//TODO: kapoy himo services ey... 

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request,{params}) {
    const {user_id} = await params;

    const supabase = await createClient();

    const {data, error} = await supabase.from('worker_roles_view').select("*").eq("barangay_id",user_id);
    console.log("this is data", data);

    return NextResponse.json({ data: data });
}
