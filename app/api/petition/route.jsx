// save image to db https://supabase.com/storage
'use server'
import { createClient} from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request){
    
    // try{
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
        
        const {data, error: error2} = await supabase.from('Petition').insert([
            {
                first_name,
                last_name,
                email,
                barangay,
                file_upload,
            }
        ])
        console.log(data, "thee data");
        if(error2){
            console.log("errrr");
            return new Response(JSON.stringify({ error: error2.message }), {
                status: 500
            });
        }
        return NextResponse.json({hello: "wirod"});
    // }catch(err){
    //     return new Response(JSON.stringify({error: 'Internal server error'}), {status:500});
    // }
}
export async function GET(){
    return NextResponse({hello:"world"});
}