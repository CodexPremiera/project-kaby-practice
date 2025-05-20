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
}
export default AccessRoleRepo;