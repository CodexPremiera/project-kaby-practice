import OfficialRepo from "@/repositories/OfficialRepo"

class OfficialService {
    constructor(supabase){
        this.repo = new OfficialRepo(supabase);
    }


    async getOfficials(brgy_id){
        const data = await this.repo.getAllByBrgyFK(brgy_id);
        return data;
    }
}
export default OfficialService;