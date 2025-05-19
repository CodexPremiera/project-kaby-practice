import BaseRepo from "./BaseRepo";
class BarangayWorkerRepo extends BaseRepo{
	constructor(supabase) {
		super("BarangayWorker", supabase);
		this.supabase = supabase;
	}
}
export default BarangayWorkerRepo;