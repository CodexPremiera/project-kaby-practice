import BaseRepo from "./BaseRepo";
class AccessRoleRepo extends BaseRepo{
	constructor(supabase) {
		super("AccessControl", supabase);
		this.supabase = supabase;
	}

	async getAllByBrgyFK(brgy_id){
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*").eq("barangay_id",brgy_id);

		if (error) throw error;
		return data;
	}




	async updateRoleUsingWorkerFK(worker_id, selectedFields={}){
		console.log("this is fields", selectedFields);
		const { data, error } = await this.supabase
			.from(this.tableName)
			.update(selectedFields)
			.eq("worker_id", worker_id)
			.select();
		if (error){
			console.log(error);
			throw error;
		}
		console.log("this is data", data);
		return data;
	}
	async deleteRoleByWorkerId(worker_id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.delete()
			.eq("worker_id", worker_id)
			.select();

		if (error) {
			console.error("Delete error:", error);
			throw error;
		}
		return data;
	}

}
export default AccessRoleRepo;