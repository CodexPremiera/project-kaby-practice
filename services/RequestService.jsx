class RequestService {
	constructor(supabase) {
		this.repo = new RequestRepo(supabase);
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

		return data;
	}
	async createRequest(requestData) {
		const data = await this.repo.create(requestData);
		return data;
	}
}
export default RequestService;
