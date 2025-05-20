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

