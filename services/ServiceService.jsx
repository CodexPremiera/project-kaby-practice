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
	async getServicesByUser() {}

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
	async getServicesByBarangay(barangayName) {
		// Assuming 'barangay' is a text field in services
		const { data, error } = await this.supabase
			.from("services")
			.select("*")
			.eq("barangay", barangayName);

		if (error) {
			console.error("Error fetching services by barangay:", error);
			return [];
		}
		return data;
	}
}
export default ServiceService;
