import MonthlyBadgeRepo from "../repositories/MonthlyBadgeRepo";

class MonthlyBadgeService {
	constructor(supabase) {
		this.repo = new MonthlyBadgeRepo(supabase);
	}

	async getGivenBadgesSet(barangayId) {
		const badgeLogs = await this.repo.getBadgeLogsByBarangay(barangayId);

		return new Set(badgeLogs.map((b) => `${b.citizen_id}|${b.service_id}`));
	}
	async createBadgeLog(badgeData) {
		return await this.repo.createBadgeLog(badgeData);
	}
	async getBadgesByBarangayThisMonth(barangayId) {
		return await this.repo.getBadgesByBarangayThisMonth(barangayId);
	}
}
export default MonthlyBadgeService;
