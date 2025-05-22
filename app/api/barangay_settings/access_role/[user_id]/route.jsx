import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import AccessRoleService from "@/services/AccessRoleService";
export async function GET(request,{params}) {
    const {user_id} = await params;
    const supabase = await createClient();
    const accessService = new AccessRoleService(supabase);


    try {
        const data = await accessService.getWorkersUsingBrgyId(user_id);
        return NextResponse.json({ data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}