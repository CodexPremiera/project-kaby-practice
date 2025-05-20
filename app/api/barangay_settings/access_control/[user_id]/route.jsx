import { NextResponse } from "next/server";
import BarangayAppointmentService from "../../../../../services/BarangayAppointmentService";
import CitizenService from "@/services/CitizenService";
import { createClient } from "@/utils/supabase/server";

export async function GET(request,{params}) {
    const {user_id} = await params;
    const supabase = await createClient();
    const citizenService = new CitizenService(supabase);



    try {
        const data = await citizenService.getCitizensByBarangayId(user_id);
        return NextResponse.json({ data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// OPTIMIZATION PURPOSES: USE VIEWS https://supabase.com/blog/postgresql-views
//TODO: kapoy himo services ey... 

// import { NextResponse } from "next/server";
// import { createClient } from "@/utils/supabase/server";

// export async function GET(request, {params}) {
//     const {user_id} = await params;

//     const supabase = await createClient();

//     const {data, error} = await supabase.from('worker_roles_view').select("*").eq("barangay_id",user_id);
//     console.log("this is data", data);

//     return NextResponse.json({ data: data });
    

// }