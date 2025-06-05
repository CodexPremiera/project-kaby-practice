import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


export async function GET(request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get("regionId");

  if (!regionId) {
    return NextResponse.json(
      { error: "Missing regionId query parameter" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("cities")
    .select("id, name")
    .eq("region_id", regionId)
    .order("name");

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch cities" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
