import BarangayWorkerRepo from "@/repositories/BarangayWorkerRepo"

class BarangayWorkerService {
    constructor(supabase){
        this.repo = new BarangayWorkerRepo(supabase);
    }

    async createWorker(workerDetails){
        const data = await this.repo.create(workerDetails);
        return data;
    }
}
export default BarangayWorkerService;