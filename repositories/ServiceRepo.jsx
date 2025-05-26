import ServiceModel from "@/models/ServiceModel";
import BaseRepo from "./BaseRepo";

export default class ServiceRepo extends BaseRepo {
	constructor(supabase) {
		super("Services", supabase);
		this.supabase = supabase;
	}

	async getAllServices() {
		return await this.repo.getAll();
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

	async getServicesByOwners(ownerIds) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*")
			.in("owner", ownerIds);

		if (error) {
			console.error("Error fetching services:", error);
			return [];
		}
		return data;
	}
	async getServicesByUser(user_id) {
		console.log(user_id, "the user id");
		const { data: citizen, error: citizenError } = await this.supabase
			.from("CitizenProfile")
			.select("user_id")
			.eq("user_id", user_id)
			.single();

		if (citizenError) {
			console.error("Citizen lookup error:", citizenError);
			return [];
		}
		console.log("Citizen data", citizen);

		const { data, error } = await this.supabase
			.from(this.tableName)
			.select()
			.eq("owner_id", citizen.user_id);

		if (error) console.log(error);
		return data;
	}

	async getFrontlineServices(barangayUserId) {
		const { data: services, error: servicesError } = await this.supabase
			.from(this.tableName)
			.select("*")
			.eq("owner", barangayUserId);

		if (servicesError) {
			console.error("Error fetching services of the Barangay:", servicesError);
			throw servicesError;
		}
		return services;
	}

	async getAroundYouServices(citizensUserId) {
		if (!Array.isArray(citizensUserId) || citizensUserId.length === 0)
			return [];
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select()
			.in("owner", citizensUserId);
		if (error) {
			console.error(error);
			throw error;
		}
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
