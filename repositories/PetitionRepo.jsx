import BaseRepo from "./BaseRepo";

class PetitionRepo extends BaseRepo {
    constructor(supabase){
        super("Petition",supabase);
        this.supabase = supabase;
    }
}
export default PetitionRepo;