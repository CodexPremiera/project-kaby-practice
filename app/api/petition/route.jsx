// save image to db https://supabase.com/storage
'use server'
import { createClient} from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request){
    try{
        const body = await request.json();
        const{
            first_name,
            last_name,
            email, 
            barangay,
            proof
        } = body;
    
        
        const file = proof;
        const {data:error} = await supabase.storage.from('petition-proof-residence').upload(`${last_name}-${first_name}-proof.png`,file);
        console.log(body);
        if(error){
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500
              }); 
        }
        const {data, error: error2} = await supabase.from('Petition').insert([
            {
                first_name: first_name,
                last_name : last_name,
                email:email,
                barangay:barangay,
                proof_url: `${last_name}-${first_name}-proof.png`,
            }
        ])
        if(error2){
            return new Response(JSON.stringify({ error: error2.message }), {
                status: 500
              });
        }
        return NextResponse.json({hello: "wirod"});
    }catch(err){
        return new Response(JSON.stringify({error: 'Internal server error'}), {status:500});
    }
}