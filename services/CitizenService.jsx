import CitizenProfileRepo from "../repositories/CitizenProfileRepo";

class CitizenService{
    constructor(){
        this.repo = new CitizenProfileRepo();
    }
    
    async createCitizenProfile(citizenDetails){
        // TODO: verify barangay exist
        const { email, first_name, last_name, barangay } = citizenDetails;

        const {data,error} = await this.repo.create(citizenDetails);

        return {data,error};
    }
}
export default CitizenService;