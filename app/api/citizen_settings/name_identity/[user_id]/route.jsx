import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import CitizenService from "@/services/CitizenService";
export async function GET(request,{params}) {
    const {user_id} = await params;
    const supabase = await createClient();
    const citizenService = new CitizenService(supabase);


    try {
        const data = await citizenService.getNameAndIdentityById(user_id);
        return NextResponse.json({ data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function PUT(request, {params}){
    const {user_id} = await params;
    const supabase = await createClient();
    const citizenService = new CitizenService(supabase);
    const body = await request.json();
    console.log("boddyy", body);
    try{
        const data = await citizenService.updateNameAndIdentityById(user_id,body);
        return NextResponse.json({data:data});
    } catch(err){
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

}