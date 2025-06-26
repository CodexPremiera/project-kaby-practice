import RequestRepo from '@/repositories/RequestRepo';

class RequestService {
	constructor(supabase) {
		this.repo = new RequestRepo(supabase);
	}
	async getAllRequests() {
		return await this.repo.getAll();
	}

	async getById(id) {
		return await this.repo.getById(id);
	}

	async getRequestByUser(id) {
		return await this.repo.getRequestsByUser(id);
	}

	async getRequestByCustomer(customerId) {
		return await this.repo.getRequestsByCustomer(customerId);
	}

	async getRequestsByServiceId(service_id, status) {
		return await this.repo.getRequestsByServiceId(service_id, status);
	}
	async updateRequestByServiceId(serviceId, id, selectedFields = {}) {
		return await this.repo.updateRequestByServiceId(serviceId, id,
			selectedFields);
	}

	async getRequestsByOwner(owner_id) {
		return await this.repo.getRequestsByOwner(owner_id);
	}

	async createRequest(requestData) {
		const { service_id, customer_id } = requestData;

		// Check for existing request with the same service and customer
		const { data: existing, error } = await this.repo.supabase
		.from(this.repo.tableName)
		.select("id, status")
		.eq("service_id", service_id)
		.eq("customer_id", customer_id)
		.in("status", ["Pending", "Ongoing"]) // adjust statuses as needed
			.maybeSingle(); // gets one or null

		if (error) {
			console.error("Error checking existing request:", error);
			throw error;
		}

		if (existing) {
			// Already exists
			return { error: "Request already exists", existing };
		}

		// Otherwise, create new request
		const data = await this.repo.create(requestData);
		console.log(requestData)
		return { data };
	}

	async updateRequest(id, selectedFields = {}) {
		return await this.repo.update(id, selectedFields);
	}

	// call the function from the repo
	async updateRequestByOwnerId(owner_id, selectedFields = {}) {
		return await this.repo.update(owner_id, selectedFields);
	}
}
export default RequestService;
