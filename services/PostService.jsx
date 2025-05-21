import PostRepo from "@/repositories/PostRepo";

class PostService {
	constructor(supabase) {
		this.repo = new PostRepo(supabase);
	}
	async getAllPosts(barangay_id) {
		const data = await this.repo.getAll(barangay_id);
		return data;
	}

	async createPost(post_data) {
		const data = await this.repo.createPost(post_data);
		return data;
	}
}
export default PostService;
