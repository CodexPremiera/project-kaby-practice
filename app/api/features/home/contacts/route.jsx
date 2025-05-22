import { NextResponse } from "next/server";
import ContactService from "@/services/ContactService";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
    const supabase = await createClient();
    const contactService = new ContactService(supabase);

    const body = await request.json();
    console.log("Request body:", body);
    
    const data = await contactService.newContact(body);
    return NextResponse.json({
        message: "Barangay contact created successfully",
        data: data,
    });
}

