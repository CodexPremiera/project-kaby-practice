// import { createClient } from "@/utils/supabase/server";
'use server'
import { createClient } from '@supabase/supabase-js'; 
import { NextResponse } from "next/server";
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  export async function GET() {
    // const supabase = createClient();
    const {data:appointments, error:error1} = await supabase.from('BarangayAppointment').select('*');
    if (error1) {
        return new Response(JSON.stringify({ error1: error1.message }),{ status: 500 });
    }
    const {data:users, error:error2} = await supabase.from('useraccount').select('*');
    if(error2){
        return new Response(JSON.stringify({ error: error2.message }),{ status: 500 });
    }
    return new Response(JSON.stringify({appointments,users}),{ status: 200, headers: {'Content-Type' : 'application/json'} });

}

