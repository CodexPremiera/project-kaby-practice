import PetitionRepo from "../repositories/PetitionRepo";

class PetitionService {
    constructor(supabase){
        this.repo = new PetitionRepo(supabase);
    }    
    async getAllPetitions(){
        const data = this.repo.getAll();
        return data;
    }
    async createPetition(petitionDetails){
        const data = this.repo.create(petitionDetails);
        return data;
    }
}
export default PetitionService;