import BaseRepo from "./BaseRepo";

export default class TransactionChatRepo extends BaseRepo {
	constructor(supabase) {
		super("TransactionChats", supabase);
		this.supabase = supabase;
	}
	
	async getChatsByRequestId(requestId) {
		const { data, error } = await this.supabase
		.from("TransactionChats")
		.select(`
			id,
			request_id,
			message,
			sent_at,
			sender_id
		`)
		.eq('request_id', requestId)
		.order('sent_at');


		if (error) {
			console.error("Error fetching chats for this transaction", error);
			throw error;
		}

		return data;
	}

	async createChat(chatData) {
		const { data, error } = await this.supabase
		.from("TransactionChats")
		.insert([chatData])
		.select()
		.single();

		if (error) {
			console.error("Error creating chat message", error);
			throw error;
		}

		return data;
	}
}
