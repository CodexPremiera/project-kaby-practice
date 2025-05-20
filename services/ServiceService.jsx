import ServiceRepo from "../repositories/ServiceRepo";

class ServiceService {
	constructor(supabase) {
		this.repo = new ServiceRepo(supabase);
	}
	async getAllServices() {
		const services = await this.repo.getAll();
		return services;
	}

	async getById(serviceId) {
		const { data, error } = await this.supabase
			.from("services")
			.select("*")
			.eq("id", serviceId)
			.single();

		if (error) {
			console.error("Error fetching service:", error);
			return null;
		}

		return data; // Return the service data if found
	}
	// async makeService(serviceData){
	//     // TODO: add logic
	//     const id = await new AuthenticationService().loggedInUserId();
	//     console.log("logged in user", id);
	//     const roleId = await new UserService().getRoleIdUsingAuth(id);
	//     console.log("role user",roleId);
	//     const serviceOwner = {
	//         ...serviceData, owner_id : roleId.id
	//     };
	//     const {data,error} = await this.repo.create(serviceOwner);
	//     return {data,error};
	// }
	async createService(serviceData) {
		const data = await this.repo.create(serviceData);
		return data;
	}
	async getFrontlineServices(barangayUserId) {
		const data = await this.repo.getFrontlineServices(barangayUserId);
		return data;
	}

	async getAroundYouServices(citizensUserIds) {
		const userIds = citizensUserIds.map((c) => c.user_id);
		return await this.repo.getAroundYouServices(userIds);
	}

	async getServicesByOwners(ownerIds) {
		const { data, error } = await this.supabase
			.from("Services")
			.select("*")
			.in("owner", ownerIds);

		if (error) {
			console.error("Error fetching services:", error);
			return [];
		}
		return data;
	}
}
export default ServiceService;
