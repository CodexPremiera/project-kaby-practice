import BaseRepo from "./BaseRepo";
export default class TemporaryAccountRepo extends BaseRepo {
    constructor(supabase) {
        super("UnverifiedCitizens", supabase);
        // this.supabase = supabase;
    }
    async getByBarangay(barangay) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select("*")
            .eq("barangay", barangay);
        if (error) {
            console.error("Error fetching temporary accounts:", error);
            return null;
        }
        return data;
    }
}