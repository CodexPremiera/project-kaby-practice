import AccessRoleRepo from "@/repositories/AccessRoleRepo"

class AccessRoleService {
    constructor(supabase){
        this.repo = new AccessRoleRepo(supabase);
    }

    async createWorker(workerDetails){
        const data = await this.repo.create(workerDetails);
        return data;
    }
    async getWorkersUsingBrgyId(brgy_id){
        const data = await this.repo.getAllByBrgyFK(brgy_id);
        return data;
    }
}
export default AccessRoleService;