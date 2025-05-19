import BarangayProfileRepo from "../repositories/BarangayProfileRepo";
import CitizenProfileRepo from "../repositories/CitizenProfileRepo";

class CitizenService {
	constructor(supabase) {
		this.repo = new CitizenProfileRepo(supabase);
		this.barangayRepo = new BarangayProfileRepo(supabase);
	}
	async getCitizensByBarangayId(barangay_id) {
		const data = await this.repo.getAllByBarangayId(barangay_id,["last_name","middle_name","first_name","id"]);
		return data;
	}
	async createCitizenProfile(citizenDetails) {
		// TODO: verify barangay exist
		const { first_name, last_name, barangay, user_id, barangay_id } =
			citizenDetails;

		const { data, error } = await this.repo.create({
			first_name,
			last_name,
			barangay,
			user_id,
			barangay_id,
		});
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
	async getCitBarangayId(id) {
		const data = await this.repo.getFieldByFKId(id, ["barangay_id"]);
		return data;
	}
	async getCitBarangayIdOnly(id) {
		const data = await this.repo.getFieldByFKId(id, ["barangay_id"]);
		return data.barangay_id;
	}
	async getCitByAuthenticatedId(id) {
		const data = await this.repo.getByAuthenticatedId(id);
		return data;
	}
	async getCitizenIdUsingRole(id) {
		const data = await this.repo.getIdUsingRole(id);
		return data;
	}
	async updateCitizenProfile(id, selectedFields = {}) {
		// console.log("this is selected fields", selectedFields, "this is id", id);
		const data = await this.repo.update(id, selectedFields);

		return data;
	}
	async getAllCitizenProfiles(id) {
		const data = await this.repo.getAllCitizenProfiles(id);
		return data;
	}
}
export default CitizenService;
