import ServiceModel from "../models/ServiceModel";
import BaseRepo from "./BaseRepo";

export default class ServiceRepo extends BaseRepo {
	constructor(supabase) {
		super("Services", supabase);
		this.supabase = supabase;
	}
	async getAllServices() {
		const apps = await this.repo.getAll();
		return apps;
	}

	async getById(id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select()
			.eq("id", id)
			.single();

		if (error) {
			console.error("Error fetching service:", error);
			return null;
		}
		return data;
	}
	async getServicesByUser(user_id) {
		console.log(user_id, "the user id");
		const { data: data1, error: error1 } = await this.supabase
			.from("CitizenProfile")
			.select("user_id")
			.eq("id", user_id)
			.single();
		console.log("data1", data1);

		const { data, error } = await this.supabase
			.from(this.tableName)
			.select()
			.eq("owner_id", data1.user_id);
		if (error) console.log(error);
		return data;
	}

	async create(serviceData) {
		try {
			const newService = new ServiceModel(
				serviceData.title,
				serviceData.owner,
				serviceData.image,
				serviceData.description,
				serviceData.type,
				serviceData.service_cost,
				serviceData.agreement_fee,
				serviceData.convenience_fee,
				serviceData.total_price,
				serviceData.start_date,
				serviceData.end_date,
				serviceData.display_badge,
				serviceData.eligible_for_badges,
				serviceData.allow_attach_file,
				serviceData.status
			);

			const { data, error } = await this.supabase
				.from(this.tableName)
				.insert([newService])
				.select();

			if (error) {
				console.log("Insert error:", error);
				return { error };
			}
			return data;
		} catch (error) {
			console.error("Error creating service model:", error);
			return { error: error.message };
		}
	}
}
