import BaseRepo from "./BaseRepo";

export default class RequestRepo extends BaseRepo {
	constructor(supabase) {
		super("Requests", supabase);
	}

	async getAllRequests() {
		return await this.repo.getAll();
	}

	async getById(id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select()
			.eq("id", id)
			.single();
		if (error) return { error };
		return { data };
	}
}
