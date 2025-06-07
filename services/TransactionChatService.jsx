import TransactionChatRepo from '../repositories/TransactionChatRepo';

class TransactionChatService {
	constructor(supabase) {
		this.repo = new TransactionChatRepo(supabase);
	}

	async getChatsByRequestId(requestId) {
		return await this.repo.getChatsByRequestId(requestId);
	}

	async createChat(chatData) {
		return await this.repo.createChat(chatData);
	}
}
export default TransactionChatService;
