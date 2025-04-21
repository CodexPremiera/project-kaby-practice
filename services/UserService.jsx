import CitizenProfileRepo from "../repositories/CitizenProfileRepo";
import UserRepo from "../repositories/UserRepo";
// import AuthenticationRepo from "../repositories/AuthenticationRepo";
import AuthenticationService from "./AuthenticationService";
class UserService{
    constructor(){
        this.repo = new UserRepo();
    }
    
    async createUser(userDetails){
        const {data,error} = await this.repo.create(userDetails);
        console.log(data,"data2");
        return {data,error};
    }
    async getUserRole(){
        const authService = new AuthenticationService();
        const user_id = await authService.loggedInUserId();
        const {data,error} = await this.repo.getById(user_id);
        console.log(data);
        if(error){
            console.log(error);
        }
        return data.role;
    }
    async getRoleIdUsingAuth(id){
        const user_id = await this.repo.getIdUsingAuth(id);
        return user_id;
    }

}
export default UserService;