import { NextResponse } from "next/server";

export async function POST(req) {
  const { acting_as_barangay, access_role } = await req.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set("acting_as_barangay", acting_as_barangay, {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60,
  });

  response.cookies.set("access_role", access_role, {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}
