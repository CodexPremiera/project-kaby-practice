import BarangayService from "@/services/BarangayService";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { error } from "console";

export async function PUT(request, {params}){
        console.log(params);

        const{ user_id } = await params;
        const supabase = await createClient();
        const barService = new BarangayService(supabase);

        console.log(user_id);

        try{
                const data = await barService.decrementBarangayBadges(user_id);
                return NextResponse.json({ data: data});
        }catch{
                console.log(error);
                return NextResponse.json({ error: error.message }, { status: 500});
        }
}