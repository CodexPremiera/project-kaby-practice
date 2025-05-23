import CitizenModel from "../models/CitizenModel";
import BaseRepo from "./BaseRepo";

class CitizenProfileRepo extends BaseRepo {
	constructor(supabase) {
		super("CitizenProfile", supabase);
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
			throw new Error("Failed to fetch citizens");
		}
	}
	async getAllByBarangayId(id, selectFields = "*") {
		const fields = Array.isArray(selectFields)
			? selectFields.join(", ")
			: selectFields;

		const { data, error } = await this.supabase
			.from(this.tableName)
			.select(fields)
			.eq("barangay_id", id);
		console.log("this is data", data);
		if (error) {
			console.log("Errr", error);
			throw error;
		}
		return data;
	}
	async create(citizenData) {
		const citizen = new CitizenModel(citizenData);
		// console.log(citizenData,"repo");
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert([citizenData])
			.select();
		if (error) {
			console.log(error);
		}
		return { data, error };
	}
	async getByAuthenticatedId(id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*")
			.eq("user_id", id);
		if (error) console.log(error);
		return data;
	}
	async getIdUsingRole(id) {
		console.log("id is", id);
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("id")
			.eq("user_id", id)
			.single();
		if (error) console.log(error);
		console.log("data taken", data);

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
	async getAllCitizenProfiles(barangay_id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("user_id")
			.eq("barangay_id", barangay_id);
		if (error) console.log(error);
		return data;
	}
}
export default CitizenProfileRepo;
