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
        const { data, error } = await this.supabase
            .from("temporary_account")
            .select("*")
            .eq("id", temporaryAccountId)
            .single();

        if (error) {
            console.error("Error fetching temporary account:", error);
            return null;
        }

        return data; // Return the temporary account data if found
    }
    async getAllByBarangay(barangay) {
        const data= await this.repo.getByBarangay(barangay);
        return data;
    }
}

export default TemporaryAccountService;