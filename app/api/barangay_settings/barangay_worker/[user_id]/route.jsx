import { NextResponse } from "next/server";
import BarangayWorkerService from "@/services/BarangayWorkerService";
import { createClient } from "@/utils/supabase/server";

export async function GET(request,{params}) {
    const {user_id} = await params;
    const supabase = await createClient();
    const workerService = new BarangayWorkerService(supabase);


    try {
        const data = await workerService.getWorkersUsingBrgyId(user_id);
        return NextResponse.json({ data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}