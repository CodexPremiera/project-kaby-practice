import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import AccessRoleService from "@/services/AccessRoleService";
export async function GET(request,{params}) {
    const {user_id} = await params;
    const supabase = await createClient();
    const accessService = new AccessRoleService(supabase);


    try {
        // const data = await accessService.getAccessRoleUsingBrgyId(user_id);
        // console.log("this is the access role",data);
        return NextResponse.json({ data: "hello" });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}