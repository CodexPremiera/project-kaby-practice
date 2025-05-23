import PostRepo from "@/repositories/PostRepo";

class PostService {
	constructor(supabase) {
		this.repo = new PostRepo(supabase);
	}
	async getAllPosts(id) {
		const data = await this.repo.getAll(id);
		return data;
	}

	async createPost(post_data) {
		const data = await this.repo.createPost(post_data);
		return data;
	}

	async updatePost(id, post_data) {
		const data = await this.repo.updatePost(id, post_data);
		return data;
	}
	async deletePost(id) {
		const data = await this.repo.deletePost(id);
		return data;
	}
}
export default PostService;
