// import { createClient } from "@/utils/supabase/server";
import { createClient } from '@supabase/supabase-js'; 

import { NextResponse } from "next/server";
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  export async function GET() {
    const {data, error} = await supabase.from('BarangayAppointment').select('*').from()
    // const {data1,error1} 
    // const {data : BarangayAppointment} = await supabase.from('BarangayAppointment').select('*');
    console.log(data);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }),{ status: 500 });
    }
    
    return new Response(JSON.stringify(data),{ status: 200 });
    // return NextResponse.json({
    //     Hello:"world"
    // });
 
}

