import BaseRepo from "./BaseRepo";

class PostRepo extends BaseRepo {
	constructor(supabase) {
		super("Post", supabase);
		this.supabase = supabase;
	}
	async getAll(barangay_id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*")
			.eq("barangayID", barangay_id);

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
}
export default PostRepo;
