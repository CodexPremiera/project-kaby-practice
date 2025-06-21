import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();
  const supabase = await createClient();

  console.log("Received token:", token);
  const { data, error } = await supabase
    .from("verification_tokens")
    .select("*")
    .eq("token", token)
    .single();
  console.log("Data expires at:", data?.expires_at);
  console.log("Current time:", new Date().toISOString());

  if (!data || new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: "Token expired or invalid." }, { status: 400 });
  }

  const { citizen_email, access_role, barangay_user_id } = data;


  return NextResponse.json({
    message: "Verified",
    access_role,
    citizen_email,
    barangay_user_id,
  });
}
