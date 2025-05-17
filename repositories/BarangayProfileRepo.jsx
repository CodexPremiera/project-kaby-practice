import BaseRepo from "./BaseRepo";

class BarangayProfileRepo extends BaseRepo {
	constructor(supabase) {
		super("BarangayProfile", supabase);
		this.supabase = supabase;
	}
	async getAll() {
		try {
			const { data, error } = await this.supabase
				.from(this.tableName)
				.select("id, barangayName");
			if (error) {
				throw new Error(error.message);
			}
			return data;
		} catch (err) {
			throw new Error("Failed to fetch barangays");
		}
	}
	async create(brgyDetails) {
		const { data, error } = await this.supabase
			.from("BarangayProfile")
			.insert([brgyDetails])
			.select();

		if (error) {
			console.log(error);
			return null;
		}

		return data;
	}
}
export default BarangayProfileRepo;
