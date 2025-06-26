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
	async getBarangayFieldsByFKId(id) {
		const data = await this.repo.getFieldByFKId(id, [
			"id",
			"barangayName",
			"address",
			"profile_pic"
		]);
		console.log("Barangay by ID", data);
		return data;
	}
	async getBarangayFieldsById(id) {
		const data = await this.repo.getById(id, ["id","barangayName", "address","profile_pic", "about", "website"]);
		console.log("Barangay by ID", data);
		return data;
	}
	async getUserIDsByBarangayId(id) {
		const data = await this.repo.getUserIDsByBarangayId(id);
		console.log("Barangay User ID: ", data);
		return data;
	}
	async getIDByUserID(user_id) {
		const data = await this.repo.getIDByUserID(user_id);
		console.log("Barangay ID: ", data);
		return data;
	}
	async updateBarangayProfile(id, selectedFields = {}){
		console.log("this is selected fields ", selectedFields);
		const data = this.repo.update(id,selectedFields);
		return data;
	}


	// async getCitizenById(id){
	//     const data= await this.repo.getById(id);
	//     return data;
	// }
	// async getCitByAuthenticatedId(id){
	//     const data = await this.repo.getByAuthenticatedId(id);
	//     return data;
	// }
	// async getCitizenIdUsingRole(id){
	//     const data = await this.repo.getIdUsingRole(id);
	//     return data;
	// }

	// for badge stock - katong 1k to be given
	async decrementBarangayBadges(id){
		const data = await this.repo.getById(id, ["badge_stock"]);

		// decrement badges
		const updateField = {
			badge_stock: data.badge_stock - 1
		};

		const updatedData = await this.repo.decrementBarangayBadges(id, updateField);

		console.log("Give out badges ", updatedData);

		return updatedData;
	}
}
export default BarangayService;
