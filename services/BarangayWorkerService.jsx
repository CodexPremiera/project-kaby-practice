import BarangayWorkerRepo from "@/repositories/BarangayWorkerRepo"
import CitizenService from "@/services/CitizenService"

class BarangayWorkerService {
    constructor(supabase){
        this.repo = new BarangayWorkerRepo(supabase);
        this.supabase = supabase;
    }

    async createWorker(workerDetails){
        const data = await this.repo.create(workerDetails);
        return data;
    }
    async getWorkersUsingBrgyId(brgy_id){
        const data = await this.repo.getAllByBrgyFK(brgy_id);
        return data;
    }
    async updateWorker(citizen_id,selectedFields={}){
        console.log("this is the citizen id in worker", citizen_id);
        const data = await this.repo.updatePositionUsingCitizenFK(citizen_id,selectedFields);
        return data;
    }
    async removeWorker(citizen_id){
        const citizenService = new CitizenService(this.supabase);
        const worker = await citizenService.updateCitizenProfile(citizen_id,{is_worker:false});
        console.log("now jobless", worker);
        const data = await this.repo.deleteByCitizenId(citizen_id);
        return data;
    }
    

}
export default BarangayWorkerService;