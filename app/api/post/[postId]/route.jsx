"use server";
import PostService from "@/services/PostService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// PUT: update a specific post
export async function PUT(request, context) {
	const supabase = await createClient();
	const postService = new PostService(supabase);

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const { postId } = await context.params;
	const body = await request.json();

	try {
		const result = await postService.updatePost(postId, body);

		if (!result || result.length === 0) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(result);
	} catch (err) {
		console.error("Error updating post:", err);
		return NextResponse.json(
			{ error: "Failed to update post" },
			{ status: 500 }
		);
	}
}

// DELETE: delete a specific post
export async function DELETE(request, context) {
	const supabase = await createClient();
	const postService = new PostService(supabase);

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const postId = context.params.postId;

	try {
		const result = await postService.deletePost(postId);

		if (!result || result.length === 0) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Post deleted successfully" });
	} catch (err) {
		console.error("Error deleting post:", err);
		return NextResponse.json(
			{ error: "Failed to delete post" },
			{ status: 500 }
		);
	}
}
