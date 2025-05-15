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

	async getFrontlineServices(user_id) {
		// Check if user is a citizen
		const { data: citizenProfile, error: citizenError } = await this.supabase
			.from("CitizenProfile")
			.select("barangay")
			.eq("user_id", user_id)
			.single();

		if (citizenError && citizenError.code !== "PGRST116") {
			console.error("Error fetching citizen profile:", citizenError);
			throw citizenError;
		}

	

		if (citizenProfile) {
			// If citizen, get their barangay and related services
			const barangayName = citizenProfile.barangay;

			const { data: barangayProfiles, error: barangayProfilesError } =
				await this.supabase
					.from("BarangayProfile")
					.select("user_id")
					.eq("barangayName", barangayName);

			if (barangayProfilesError) {
				console.error(
					"Error fetching barangay profiles:",
					barangayProfilesError
				);
				throw barangayProfilesError;
			}

			const userIds = barangayProfiles.map((profile) => profile.user_id);

			if (userIds.length === 0) return [];

			const { data: services, error: servicesError } = await this.supabase
				.from("Services")
				.select("*")
				.in("owner", userIds);

			if (servicesError) {
				console.error("Error fetching services for citizen:", servicesError);
				throw servicesError;
			}

			return services;
		} else {
			// Otherwise check if user is a barangay profile
			const { data: barangayProfile, error: barangayProfileError } =
				await this.supabase
					.from("BarangayProfile")
					.select("id")
					.eq("user_id", user_id)
					.single();

			if (barangayProfileError) {
				console.error("Error fetching barangay profile:", barangayProfileError);
				throw barangayProfileError;
			}

			const { data: services, error: servicesError } = await this.supabase
				.from("Services")
				.select("*")
				.eq("owner", user_id);

			if (servicesError) {
				console.error("Error fetching services for barangay:", servicesError);
				throw servicesError;
			}

			return services;
		}
	}

	async getAroundYouServices(user_id) {}

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
