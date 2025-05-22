import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request,{params}) {
    const {user_id} = await params;

    const supabase = await createClient();

    const {data, error} = await supabase.from('worker_no_roles').select("*").eq("barangay_id",user_id);
    console.log("this is data", data);

    return NextResponse.json({ data: data });
}
