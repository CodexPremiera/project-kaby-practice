import BaseRepo from "./BaseRepo";

export default class TransactionRemarkRepo extends BaseRepo {
	constructor(supabase) {
		super("TransactionRemarks", supabase);
		this.supabase = supabase;
	}
	
	async getRemarksByRequestId(requestId) {
		const { data, error } = await this.supabase
		.from("TransactionRemarks")
		.select(`
			id,
			request_id,
			content,
			sent_at
		`)
		.eq('request_id', requestId)
		.order('sent_at');


		if (error) {
			console.error("Error fetching remarks for this transaction", error);
			throw error;
		}

		return data;
	}

	async createRemark(remarkData) {
		const { data, error } = await this.supabase
		.from("TransactionRemarks")
		.insert([remarkData])
		.select()
		.single();

		if (error) {
			console.error("Error creating remark message", error);
			throw error;
		}

		return data;
	}
}
