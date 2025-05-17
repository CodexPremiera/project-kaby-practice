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
}
export default BaseRepo;
