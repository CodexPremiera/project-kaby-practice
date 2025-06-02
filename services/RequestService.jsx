import RequestRepo from "@/repositories/RequestRepo";

class RequestService {
	constructor(supabase) {
		this.repo = new RequestRepo(supabase);
	}
	async getAllRequests() {
		const data = await this.repo.getAll();
		return data;
	}

	async getById(id) {
		const data = await this.repo.getById(id);
		return data;
	}

	async getRequestByUser(id) {
		const data = await this.repo.getRequestsByUser(id);
		return data;
	}

	async getRequestsByServiceId(service_id, status) {
		const data = await this.repo.getRequestsByServiceId(service_id, status);
		return data;
	}
	async updateRequestByServiceId(serviceId, id, selectedFields = {}) {
		const data = await this.repo.updateRequestByServiceId(serviceId, id, selectedFields);
		return data;
	}

	async getRequestsByOwner(owner_id) {
		const data = await this.repo.getRequestsByOwner(owner_id);
		return data;
	}

	async createRequest(requestData) {
		const data = await this.repo.create(requestData);
		return data;
	}

	async updateRequest(id, selectedFields = {}) {
		const data = await this.repo.update(id, selectedFields);
		return data;
	}

	// call the function from the repo
	async updateRequestByOwnerId(owner_id, selectedFields = {}) {
		const data = await this.repo.update(owner_id, selectedFields);
		return data;
	}
}
export default RequestService;
