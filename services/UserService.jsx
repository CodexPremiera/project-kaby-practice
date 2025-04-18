import CitizenProfileRepo from "../repositories/CitizenProfileRepo";
import UserRepo from "../repositories/UserRepo";

class UserService{
    constructor(){
        this.repo = new UserRepo();
    }
    
    async createUser(userDetails){
        const {data,error} = await this.repo.create(userDetails);
        console.log(data,"data2");
        return {data,error};
    }
}
export default UserService;