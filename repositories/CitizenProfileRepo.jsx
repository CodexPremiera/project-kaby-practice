import CitizenModel from "../models/CitizenModel";
import BaseRepo from "./BaseRepo";

class CitizenProfileRepo extends BaseRepo {
	constructor(supabase) {
		super("CitizenProfile", supabase);
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
	async getFieldByFKId(user_id, selectFields="*"){
		const fields = Array.isArray(selectFields)
			? selectFields.join(", ")
			: selectFields;

		const { data, error } = await this.supabase
			.from(this.tableName)
			.select(fields)
			.eq("user_id", user_id)
			.single();
		if (error) throw error;
		console.log("data name is:  ",data);
		return data;
	}
}
export default CitizenProfileRepo;
