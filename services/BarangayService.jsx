import BarangayProfileRepo from "@/repositories/BarangayProfileRepo";

class BarangayService {
	constructor(supabase) {
		this.repo = new BarangayProfileRepo(supabase);
	}

	async createBarangayProfile(brgyDetails) {
		// TODO: verify barangay exist
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
