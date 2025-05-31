import TransactionChatRepo from '../repositories/TransactionChatRepo';

class TransactionChatService {
	constructor(supabase) {
		this.repo = new TransactionChatRepo(supabase);
	}

	async getChatsByRequestId(requestId) {
		const data = await this.repo.getChatsByRequestId(requestId);
		return data;
	}
}
export default TransactionChatService;
