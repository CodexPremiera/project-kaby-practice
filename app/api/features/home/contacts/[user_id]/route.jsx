import { NextResponse } from "next/server";
import ContactService from "@/services/ContactService";
import { createClient } from "@/utils/supabase/server";

export async function GET(request,{params}) {
    const {user_id} = await params;
    const supabase = await createClient();
    const contactService = new ContactService(supabase);



    try {
        const data = await contactService.getBrgyContacts(user_id);
        return NextResponse.json({ data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
