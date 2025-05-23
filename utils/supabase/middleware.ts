import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value)
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// Do not run code between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: DO NOT REMOVE auth.getUser()

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// console.log(user, "this is user");


	const publicPaths = [
		"/",              // root
		"/login",         // login page
		"/petition",      // petition page
	];
	const isPublicPath = publicPaths.includes(request.nextUrl.pathname) ||
	 	request.nextUrl.pathname.startsWith("/api") ||
		request.nextUrl.pathname.startsWith("/auth")||
		request.nextUrl.pathname.startsWith("/register")||
		request.nextUrl.pathname.startsWith("/search");
	
	if (!user && !isPublicPath) {
		console.log("Unauthenticated access blocked: redirecting to login.");
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}
	if (user && request.nextUrl.pathname === "/barangay_desk") {
		const { data: profile, error } = await supabase
			.from("userroles") 
			.select("role")
			.eq("user_id", user.id)
			.single();

		if (error || profile?.role !== "admin") {
			console.log("Non-admin user blocked from /barangay_desk");
			const url = request.nextUrl.clone();
			url.pathname = "/home";
			return NextResponse.redirect(url);
		}
	}
	if (user && request.nextUrl.pathname === "/citizen_desk") {
		const { data: profile, error } = await supabase
			.from("userroles") 
			.select("role")
			.eq("user_id", user.id)
			.single();

		if (error || profile?.role !== "barangay") {
			console.log("Non-admin user blocked from /citizen_desk");
			const url = request.nextUrl.clone();
			url.pathname = "/home";
			return NextResponse.redirect(url);
		}
	}

	// IMPORTANT: You *must* return the supabaseResponse object as it is.
	// If you're creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}

// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// export async function updateSession(request: NextRequest) {
// 	let supabaseResponse = NextResponse.next({
// 		request,
// 	});

// 	const supabase = createServerClient(
// 		process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,	
// 		{
// 			cookies: {
// 				getAll() {
// 					console.log(request.cookies.getAll(), "this is cookies");
// 					return request.cookies.getAll(); // ✅ correct
// 				},
// 				setAll(cookiesToSet) {
// 					// ✅ ONLY set cookies on the response
// 					cookiesToSet.forEach(({ name, value, options }) =>
// 						supabaseResponse.cookies.set(name, value, options)
// 					);
// 				},
// 			},
// 		}
// 	);

// 	// This line must stay here for auth session to persist
// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();
// 	console.log(user, "this is user");

// 	if (
// 		!user &&
// 		!request.nextUrl.pathname.startsWith("/login") &&
// 		!request.nextUrl.pathname.startsWith("/auth") &&
// 		!request.nextUrl.pathname.startsWith("/api")

// 	) {
// 		console.log("User not found, redirecting to login page");
// 		const url = request.nextUrl.clone();
// 		url.pathname = "/login";
// 		return NextResponse.redirect(url);
// 	}
// 	console.log('Request Path:', request.nextUrl.pathname);
//     console.log('Cookies:', request.cookies.getAll());
// 	return supabaseResponse; // ✅ always return this
// }
