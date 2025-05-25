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



    async updateRole(citizen_id,selectedFields={}){
        console.log("this is the citizen id in role", citizen_id);
        const data = await this.repo.updateRoleUsingCitizenFK(citizen_id,selectedFields);
        return data;
    }
    async removeRole(worker_id){
        const data = await this.repo.deleteRoleByWorkerId(worker_id);
        return data;
    }

}
export default AccessRoleService;