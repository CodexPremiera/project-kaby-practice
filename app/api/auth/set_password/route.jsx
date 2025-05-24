import { createClient } from "@/utils/supabase/server";
import AuthenticationService from "@/services/AuthenticationService";
import { NextResponse } from "next/server";
import supabaseAdmin from "@/utils/supabase/admin";

// TODO DELETE PUT AND GET SOON: used this to set hasPassword true
export async function PUT(request) {
    const supabase = await createClient();
    const authService = new AuthenticationService(supabase);
    const body = await request.json();
    console.log("i am called");
    try {
        const result = await authService.setAllPasswordTrue();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ success: false, error: "Unexpected server error." });
    }
}
export async function GET(request){
    const supabase = await createClient();
	const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    return NextResponse.json(data);

}
export async function POST(request) {
	const supabase = await createClient();
	const authService = new AuthenticationService(supabase);
	const body = await request.json();

	try {
		const result = await authService.set(body.current_password, body.new_password);
		return NextResponse.json(result);
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ success: false, error: "Unexpected server error." });
	}
}
