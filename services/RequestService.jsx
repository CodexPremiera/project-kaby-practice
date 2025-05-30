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
	async getRequestByUser(id){
		const data = await this.repo.getRequestsByUser(id);
		return data;
	}
	async getRequestsByServiceId(service_id,status) {
		const data = await this.repo.getRequestsByServiceId(service_id, status);
		return data;
	}
	async createRequest(requestData) {
		const data = await this.repo.create(requestData);
		return data;
	}

	async updateRequest(id, selectedFields = {}){
		const data = await this.repo.update(id, selectedFields);
		return data; 
	}
	// call the function from the repo
	async updateRequestByOwnerId(){}
}
export default RequestService;
