import { NextResponse } from "next/server";
import BarangayWorkerService from "@/services/BarangayWorkerService";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
    const supabase = await createClient();
    const barangayWorkerService = new BarangayWorkerService(supabase);

    const body = await request.json();
    console.log("Request body:", body);
    
    const data = await barangayWorkerService.createWorker(body);
    return NextResponse.json({
        message: "Barangay worker created successfully",
        data: data,
    });
}

