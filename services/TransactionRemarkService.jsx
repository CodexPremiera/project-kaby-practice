import TransactionRemarkRepo from '../repositories/TransactionRemarkRepo';

class TransactionRemarkService {
	constructor(supabase) {
		this.repo = new TransactionRemarkRepo(supabase);
	}

	async getRemarksByRequestId(requestId) {
		return await this.repo.getRemarksByRequestId(requestId);
	}

	async createRemark(remarkData) {
		return await this.repo.createRemark(remarkData);
	}
}
export default TransactionRemarkService;
