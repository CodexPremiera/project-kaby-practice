import BaseRepo from "./BaseRepo";
class BarangayWorkerRepo extends BaseRepo{
	constructor(supabase) {
		super("BarangayWorker", supabase);
		this.supabase = supabase;
	}

	async getAllByBrgyFK(brgy_id){
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*").eq("barangay_id",brgy_id);

		if (error) throw error;
		return data;
	}
}
export default BarangayWorkerRepo;