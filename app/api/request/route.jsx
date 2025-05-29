import RequestService from "@/services/RequestService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request){
        const supabase = await createClient();
        const reqService = new RequestService(supabase);
        
        const body = await request.json();
        const data = await reqService.createRequest(body);

        return NextResponse.json(data);
}