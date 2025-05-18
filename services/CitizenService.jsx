import BarangayProfileRepo from "../repositories/BarangayProfileRepo";
import CitizenProfileRepo from "../repositories/CitizenProfileRepo";

class CitizenService {
	constructor(supabase) {
		this.repo = new CitizenProfileRepo(supabase);
		this.barangayRepo = new BarangayProfileRepo(supabase);
	}

	async createCitizenProfile(citizenDetails) {
		// TODO: verify barangay exist
		const { first_name, last_name, barangay, user_id } = citizenDetails;

		const { data, error } = await this.repo.create({first_name,last_name,barangay,user_id});
		if (error) {
			console.log(error);
			return { error: "Failed to create citizen profile" };
		}

		//const { data, error } = await this.repo.create(citizenDetails);

		return { data, error: null };
	}
	async getCitizenById(id) {
		const data = await this.repo.getById(id);
		return data;
	}
	async getCitByAuthenticatedId(id) {
		const data = await this.repo.getByAuthenticatedId(id);
		return data;
	}
	async getCitizenIdUsingRole(id) {
		const data = await this.repo.getIdUsingRole(id);
		return data;
	}
	async updateCitizenProfile(id,selectedFields = {}) {
		// console.log("this is selected fields", selectedFields, "this is id", id);
		const data = await this.repo.update(id, selectedFields);
		
		return data;
	}
	
}
export default CitizenService;
