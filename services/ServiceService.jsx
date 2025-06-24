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
		const data = await this.repo.getById(serviceId);
		return data;
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
	async updateService(id, serviceData) {
		const data = await this.repo.updateService(id, serviceData);

		console.log("this is updateService Service", serviceData);
		console.log("this is data", data);
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
		const data = await this.repo.getServicesByOwners(ownerIds);
		return data;
	}

	async getAllEligibleForBadgesServices(barangayUserId) {
		const data =
			await this.repo.getAllEligibleForBadgesServices(barangayUserId);
		return data;
	}
}
export default ServiceService;
