import BarangayWorkerRepo from "@/repositories/BarangayWorkerRepo"

class BarangayWorkerService {
    constructor(supabase){
        this.repo = new BarangayWorkerRepo(supabase);
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
export default BarangayWorkerService;