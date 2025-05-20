import AccessRoleRepo from "@/repositories/AccessRoleRepo"

class AccessRoleService {
    constructor(supabase){
        this.repo = new AccessRoleRepo(supabase);
    }

    async createAccessRole(details){
        const data = await this.repo.create(details);
        return data;
    }
    async getAccessRpleUsingBrgyId(brgy_id){
        const data = await this.repo.getAllByBrgyFK(brgy_id);
        return data;
    }
    async
}
export default AccessRoleService;