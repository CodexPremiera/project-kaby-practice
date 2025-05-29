import RequestService from "@/services/RequestService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import CitizenService from "@/services/CitizenService";

export async function POST(request){
        const supabase = await createClient();
        const reqService = new RequestService(supabase);
        const citService = new CitizenService(supabase); //i hate semicolons

        const body = await request.json();
        const {user_id, ...otherValues} = body; 
        const cust_id = await citService.getCitByAuthenticatedId(user_id)

        const newRequestData = {
                ...otherValues,
                customer_id : cust_id?.id
        }

        const data = await reqService.createRequest(newRequestData);
        console.log(data, "pakening");
        return NextResponse.json(data);
}