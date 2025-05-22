"use server";
import PostService from "@/services/PostService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
	const supabase = await createClient();
	const postService = new PostService(supabase);

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const body = await request.json();

	const postData = {
		content: body.content,
		media: body.media,
		time_uploaded: body.time_uploaded,
		owner: user.id,
	};

	const data = await postService.createPost(postData);
	console.log(data, "post content");

	return NextResponse.json(data);
}

export async function GET() {
	// Getting all the posts
	const supabase = await createClient();
	const postService = new PostService(supabase);

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}
	try {
		const posts = await postService.getAllPosts(user.id);
		return NextResponse.json(posts);
	} catch (err) {
		console.error("Error fetching posts:", err);
		return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
			status: 500,
		});
	}
}

