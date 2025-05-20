// OPTIMIZATION PURPOSES: USE VIEWS https://supabase.com/blog/postgresql-views
//TODO: kapoy himo services ey... 

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
    // const {user_id} = await params;

    const supabase = await createClient();

    const {data, error} = await supabase.from('worker_roles_view').select("*").eq("barangay_id","c84e9fff-2c23-4969-8ad4-7cd0bcc4a4c4");
    console.log("this is data", data);

    return NextResponse.json({ data: data });
    

}