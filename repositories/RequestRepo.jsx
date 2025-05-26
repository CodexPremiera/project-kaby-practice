import BaseRepo from "./BaseRepo";

export default class RequestRepo extends BaseRepo {
	constructor(supabase) {
		super("Requests", supabase);
		this.supabase = supabase;
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

		if (error) {
			console.error("Error fetching service request:", error);
			return null;
		}
		return data;
	}
	async getRequestsByUser(user_id) {
		console.log(user_id, "the user id");
		const { data: data1, error: error1 } = await this.supabase
			.from(this.tableName)
			.select("citizen_id")
			.eq("id", user_id)
			.single();
		console.log("data1", data);

		const { data, error } = await this.supabase
			.from(this.tableName)
			.select()
			.eq("citizen_id", data1.user_id);

		if (error) console.log(error);
		return data;
	}

	async getRequestsByServiceId(service_id, status) {
		let query = this.supabase
			.from(this.tableName)
			.select("*")
			.eq("service_id", service_id);

		if (status) {
			query = query.eq("status", status);
		}

		const { data, error } = await query;

		if (error) {
			console.error("Error fetching requests:", error);
			throw error;
		}
		return data;
	}
}
