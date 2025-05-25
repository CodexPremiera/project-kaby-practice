import { NextResponse } from "next/server";
import BarangayWorkerService from "@/services/BarangayWorkerService";
import { createClient } from "@/utils/supabase/server";
import CitizenService from "@/services/CitizenService"
export async function POST(request) {
    const supabase = await createClient();
    const barangayWorkerService = new BarangayWorkerService(supabase);
    const citService = new CitizenService(supabase);

    const body = await request.json();
    console.log("Request body:", body);
    
    const cit = citService.setIsWorker(body.citizen_id, {is_worker:"TRUE"});
    const data = await barangayWorkerService.createWorker(body);
    return NextResponse.json({
        message: "Barangay worker created successfully",
        data: data,
    });
}
export async function PUT(request){
    const supabase = await createClient();
    const barangayWorkerService = new BarangayWorkerService(supabase);
    
    const body = await request.json();
    const {citizen_id, position} = body;
    const data = await barangayWorkerService.updateWorker(citizen_id,{position:position});
    console.log("Request body:", body);

    return NextResponse.json(data);
}
export async function DELETE(request){
    const supabase = await createClient();
    const barangayWorkerService = new BarangayWorkerService(supabase);
    const body = await request.json();

    const {citizen_id} = body;
    const data = await barangayWorkerService.removeWorker(citizen_id);

    return NextResponse.json(data);

}

