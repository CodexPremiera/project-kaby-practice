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
			.select("id")
			.eq("customer_id", user_id)
			.single();
		console.log("data", data1);

		if (error1) console.log(error1);
		return data1;
	}

	async getRequestsByOwner(owner_id) {
		console.log(owner_id, "the user id");
		const { data: data1, error: error1 } = await this.supabase
			.from(this.tableName)
			.select("id")
			.eq("owner", owner_id)
			.single();
		console.log("data", data1);

		if (error1) console.log(error1);
		return data1;
	}

	// THIS GETS THE SERVICES BY ID
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
	
	// make a repository that updates the fields using the owner
	async updateRequestsByOwnerId(owner_id, fields = {}){
		const { data, error } = await this.supabase
			.from(this.tableName)
			.update(fields)
			.eq("owner", owner_id)
			.select();
		if(error){
			console.log(error);
			throw error;
		}

		console.log("the data ", data);
		return data;
	}
}
