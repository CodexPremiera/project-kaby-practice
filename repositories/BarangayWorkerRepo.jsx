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
	async updatePositionUsingCitizenFK(citizen_id, selectedFields={}){
		console.log("this is fields", selectedFields);
		const { data, error } = await this.supabase
			.from(this.tableName)
			.update(selectedFields)
			.eq("citizen_id", citizen_id)
			.select();
		if (error){
			console.log(error);
			throw error;
		}
		console.log("this is data", data);
		return data;
	}
	async deleteByCitizenId(citizen_id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.delete()
			.eq("citizen_id", citizen_id)
			.select();

		if (error) {
			console.error("Delete error:", error);
			throw error;
		}
		return data;
	}

}
export default BarangayWorkerRepo;