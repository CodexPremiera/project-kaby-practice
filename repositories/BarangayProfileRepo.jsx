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
				.select("*");
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
	async getFieldByFKId(user_id, selectFields = "*") {
		const fields = Array.isArray(selectFields)
			? selectFields.join(", ")
			: selectFields;

		const { data, error } = await this.supabase
			.from(this.tableName)
			.select(fields)
			.eq("user_id", user_id)
			.single();
		if (error) throw error;
		console.log("data name is:  ", data);
		return data;
	}
	async getUserIDsByBarangayId(barangay_id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("user_id")
			.eq("id", barangay_id);

		if (error) throw error;

		return data;
	}
	async getIDByUserID(user_id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("id")
			.eq("user_id", user_id)
			.single();

		if (error) throw error;

		return data.id;
	}
	// add decrement badges
	// base sa citizen profile
	async decrementBarangayBadges(id, fields = {}){
		try{
			const {data, error} = await this.supabase
			.from(this.tableName)
			.update(fields)
			.eq('id', id)
			.select();

			if(error){
				console.log("Update error: ", error);
				throw error;
			}

			console.log("Updated data: ", data);
			return data;
		}catch(error){
			console.error("Error in handling request: ", error);
			throw error;
		}
	}
}
export default BarangayProfileRepo;
