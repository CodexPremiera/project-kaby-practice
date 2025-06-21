import BaseRepo from "./BaseRepo";
class MonthlyBadgeRepo extends BaseRepo {
	constructor(supabase) {
		super("MonthlyBadge", supabase);
		this.supabase = supabase;
	}
	async getBadgeLogsByBarangay(barangayId) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("citizen_id, service_id")
			.eq("barangay_id", barangayId);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	}
	async createBadgeLog({
		citizen_id,
		barangay_id,
		service_id,
		date_given,
		status,
	}) {
		const { data, error } = await this.supabase.from(this.tableName).insert([
			{
				citizen_id,
				barangay_id,
				service_id,
				date_given,
				status,
			},
		]);

		if (error) throw new Error(error.message);
		return data;
	}
	async getBadgesByBarangayThisMonth(barangayId) {
		const { data, error } = await this.supabase
			.from("view_monthly_citizen_badges")
			.select("*")
			.eq("barangay_id", barangayId);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	}
}
export default MonthlyBadgeRepo;
