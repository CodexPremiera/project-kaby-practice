import { NextResponse } from "next/server";
import AccessRoleService from "@/services/AccessRoleService";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
    const supabase = await createClient();
    const accessService = new AccessRoleService(supabase);

    const body = await request.json();
    console.log("Request body:", body);
    
    const data = await accessService.createAccessRole(body);
    return NextResponse.json({
        message: "Barangay worker created successfully",
        data: data,
        // data: "wompwomp",
    });
}
export async function PUT(request){
    const supabase = await createClient();
    const accessService = new AccessRoleService(supabase);
    
    const body = await request.json();
    const {worker_id, access_role} = body;
    console.log("roleszz", body);
    const data = await accessService.updateRole(worker_id,{access_role:access_role});
    console.log("Request body issss:", body);

    return NextResponse.json(data);
}
export async function DELETE(request){
    const supabase = await createClient();
    const accessService = new AccessRoleService(supabase);
    const body = await request.json();

    const {worker_id} = body;
    console.log(body, "this is lawas");
    const data = await accessService.removeRole(worker_id);

    return NextResponse.json(data);
}

