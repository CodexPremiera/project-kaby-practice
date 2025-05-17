import BarangayProfileRepo from "@/repositories/BarangayProfileRepo";

class BarangayService {
	constructor(supabase) {
		this.repo = new BarangayProfileRepo(supabase);
	}

	async createBarangayProfile({ address, badge_stock, barangayName, user_id }) {
		if (!address || !badge_stock || !barangayName || !user_id) {
			throw new Error("Missing required fields for BarangayProfile.");
		}

		const brgyDetails = {
			address: address,
			badge_stock: badge_stock,
			barangayName: barangayName,
			user_id: user_id,
		};

		const data = await this.repo.create(brgyDetails);
		return data;
	}

	async getAllBarangays() {
		const data = await this.repo.getAll();
		return data;
	}
	async getBarangayById(id) {
		const data = await this.repo.getById(id);
		return data;
	}

	// async getCitByAuthenticatedId(id){
	//     const data = await this.repo.getByAuthenticatedId(id);
	//     return data;
	// }
	// async getCitizenIdUsingRole(id){
	//     const data = await this.repo.getIdUsingRole(id);
	//     return data;
	// }
}
export default BarangayService;
