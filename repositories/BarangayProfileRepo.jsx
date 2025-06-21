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
	async decrementStockAndIncrementGiven(user_id) {
		const { data: currentData, error: fetchError } = await this.supabase
			.from(this.tableName)
			.select("badge_stock, badge_given")
			.eq("user_id", user_id) 
			.single();

		if (fetchError) {
			throw fetchError;
		}

		const { badge_stock, badge_given } = currentData;

		if (badge_stock <= 0) {
			throw new Error("No badge stock available.");
		}

		const { data, error: updateError } = await this.supabase
			.from(this.tableName)
			.update({
				badge_stock: badge_stock - 1,
				badge_given: badge_given + 1,
			})
			.eq("user_id", user_id)
			.select();

		if (updateError) {
			throw updateError;
		}

		return data;
	}

	// base sa citizen profile
}
export default BarangayProfileRepo;
