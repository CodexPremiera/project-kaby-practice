import TemporaryAccountRepo from "../repositories/TemporaryAccountRepo";

 class TemporaryAccountService {
    constructor(supabase) {
        this.repo = new TemporaryAccountRepo(supabase);
    }

    async createTemporaryAccount(temporaryAccount) {
        const data = await this.repo.create(temporaryAccount);
        return data; 
    }

    async getAllTemporaryAccounts() {
        const temporaryAccounts = await this.repo.getAll();
        return temporaryAccounts;
    }

    async getById(temporaryAccountId) {
        console.log("this is temp acc", temporaryAccountId)
        const  data= await this.repo.getById(temporaryAccountId);
        console.log("this is data", data)

        return data; // Return the temporary account data if found
    }
    async getAllByBarangay(barangay) {
        const data= await this.repo.getByBarangay(barangay);
        return data;
    }
    	async updateTempAccount(id,selectedFields = {}) {
		// console.log("this is selected fields", selectedFields, "this is id", id);
		const data = await this.repo.update(id, selectedFields);
		
		return data;
	}
}

export default TemporaryAccountService;