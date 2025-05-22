'use server'
import { NextResponse } from "next/server";
import PetitionService from "../../../services/PetitionService";
import { createClient } from '@/utils/supabase/server'

export async function POST(request){
    const supabase = await createClient();
        // const petitionRepo = new PetitionRepo(supabase);
    const petitionService = new PetitionService(supabase);
    

        const body = await request.json();
        console.log("body is this",body);
        const{
            first_name,
            last_name,
            email, 
            barangay,
            file_upload
        } = body;
        console.log(`${first_name},${last_name},${email},${barangay}, FILE:${file_upload}`);
        

        const data = await petitionService.createPetition(body);
        console.log(data, "thee data");

    return NextResponse.json(data);

}
export async function GET(){
    return NextResponse.json({hello:"world"});
}