import BaseRepo from "./BaseRepo";

class BarangayProfileRepo extends BaseRepo {
    constructor(supabase){
        super("BarangayProfile",supabase);
        this.supabase = supabase;
    }
}
export default BarangayProfileRepo;