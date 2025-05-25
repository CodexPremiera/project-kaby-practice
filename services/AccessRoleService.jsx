import AccessRoleRepo from "@/repositories/AccessRoleRepo"

class AccessRoleService {
    constructor(supabase){
        this.repo = new AccessRoleRepo(supabase);
    }

    async createAccessRole(details){
        const data = await this.repo.create(details);
        return data;
    }
    async getAccessRoleUsingBrgyId(brgy_id){
        const data = await this.repo.getAllByBrgyFK(brgy_id);
        console.log("unsay pakita", data);
        return data;
    }

}
export default AccessRoleService;