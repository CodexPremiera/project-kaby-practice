import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { actingAs } = await req.json();
    console.log("this is acting as", actingAs);

	if (!["citizen", "barangay"].includes(actingAs)) {
		return NextResponse.json({ error: "Invalid role" }, { status: 400 });
	}

	cookies().set("actingAs", actingAs, {
		path: "/",
		httpOnly: false,
		sameSite: "lax",
		maxAge: 60 * 60 * 24,
	});

	return NextResponse.json({ message: "Role set" });
}
