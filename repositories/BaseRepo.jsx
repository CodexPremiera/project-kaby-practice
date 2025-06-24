class BaseRepo {
	constructor(tableName, supabase) {
		this.tableName = tableName;
		this.supabase = supabase;
	}
	async getAll() {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*");
		if (error) throw error;
		return data;
	}
	async getById(id,selectFields = "*") {
		const fields = Array.isArray(selectFields)
			? selectFields.join(", ")
			: selectFields;

		const { data, error } = await this.supabase
			.from(this.tableName)
			.select(fields)
			.eq("id", id)
			.single();
		if (error) throw error;
		return data;
	}
	async create(details) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert(details)
			.select();
		if (error) {
			console.log(error);
		}
		return data;
	}
	async update(id, fields = {}) {
		console.log("this is fields", fields);
		const { data, error } = await this.supabase
			.from(this.tableName)
			.update(fields)
			.eq("id", id)
			.select()
			.single();
		if (error){
			console.log(error);
			throw error;
		}
		console.log("this is data", data);
		return data;
	}
}
export default BaseRepo;
