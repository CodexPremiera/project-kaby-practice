import BaseRepo from "./BaseRepo";

export default class ServiceRepo extends BaseRepo {
	constructor(supabase) {
		super("Services", supabase);
		this.supabase = supabase;
	}

	async getAll() {
		const { data, error } = await this.supabase
		.from(this.tableName)
		.select()
		.eq("is_permanently_deleted", false);

		if (error) {
			console.error("Error fetching services:", error);
			return [];
		}

		return data.filter(item => !item.is_permanently_deleted);
	}

	async getById(id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select()
			.eq("id", id)
			.eq("is_permanently_deleted", false)
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
			.eq("is_permanently_deleted", false)
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
			.eq("is_permanently_deleted", false)
			.eq("owner_id", citizen.user_id);

		if (error) console.log(error);
		return data;
	}

	async getFrontlineServices(barangayUserId) {
		const { data: services, error: servicesError } = await this.supabase
			.from(this.tableName)
			.select("*")
			.eq("is_permanently_deleted", false)
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
			.eq("is_permanently_deleted", false)
			.in("owner", citizensUserId);
		if (error) {
			console.error(error);
			throw error;
		}
		return data;
	}

	async getAllEligibleForBadgesServices(barangayUserId) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*")
			.eq("is_permanently_deleted", false)
			.eq("owner", barangayUserId)
			.eq("eligible_for_badges", true);

		if (error) {
			console.error("Error fetching eligible services:", error);
			throw error;
		}

		return data;
	}

	async create(serviceData) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert([serviceData])
			.select("*");

		return { data, error };
	}
	async updateService(id, service_data) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.update(service_data)
			.eq("id", id)
			.select()
			.maybeSingle();

		if (error) {
			console.log("Supabase update error:", error);
			throw error;
		}
		return data;
	}
}
