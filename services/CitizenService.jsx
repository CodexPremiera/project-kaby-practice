import BarangayProfileRepo from "../repositories/BarangayProfileRepo";
import CitizenProfileRepo from "../repositories/CitizenProfileRepo";
import AuthenticationService from "./AuthenticationService";

class CitizenService {
	constructor(supabase) {
		this.repo = new CitizenProfileRepo(supabase);
		this.barangayRepo = new BarangayProfileRepo(supabase);
	}
	async getCitizensByBarangayId(barangay_id) {
		const data = await this.repo.getAllByBarangayId(barangay_id,["last_name","middle_name","first_name","id","is_worker"]);
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

	async getNameAndIdentityById(id){
		const data = await this.repo.getById(id,["first_name", "last_name", "middle_name","suffix","sex","birthdate","birthplace"]);
		return data;
	}
	async updateNameAndIdentityById(id, selectedFields={}){
		const data = await this.repo.update(id,selectedFields);
		return data;
	}
	async getDemograpbicsById(id){
		const data = await this.repo.getById(id,["citizenship", "religion", "employment","highest_education","other_information"]);
		return data;
	}
	async updateDemograpbicsById(id, selectedFields={}){
		const data = await this.repo.update(id,selectedFields);
		return data;
	}
	async getResidenceById(id){
		const data = await this.repo.getById(id,["region", "province", "city","barangay","sitio", "years_of_residence"]);
		return data;
	}
	async updateResidencyById(id, selectedFields={}){
		const data = await this.repo.update(id,selectedFields);
		return data;
	}
	async getContactDetailsById(citizen_id, user_id){
		const authService = new AuthenticationService(this.supabase);
		const email = await authService.getUserEmail(user_id);
		const contacts = await this.repo.getById(citizen_id,["mobile_number", "telephone_number"]);
		const contactDetails = {
			email,
			mobile_number:contacts.mobile_number,
			telephone_number:contacts.telephone_number,
		}
		return contactDetails;
	}
	async updateContactDetailsById(id, selectedFields={}){
		const data = await this.repo.update(id,selectedFields);
		return data;
	}
}
export default CitizenService;
