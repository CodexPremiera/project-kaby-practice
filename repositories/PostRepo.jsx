import BaseRepo from "./BaseRepo";

class PostRepo extends BaseRepo {
	constructor(supabase) {
		super("Post", supabase);
		this.supabase = supabase;
	}
	async getAll(id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*")
			.eq("owner", id);

		if (error) throw error;
		return data;
	}
	async createPost(post_data) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert([post_data])
			.select("*");

		return { data, error };
	}
	async updatePost(id, post_data) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.update(post_data)
			.eq("id", id)
			.select();

		if (error) throw error;
		return data;
	}
	async deletePost(id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.delete()
			.eq("id", id)
			.select();

		if (error) throw error;
		return data;
	}
}
export default PostRepo;
