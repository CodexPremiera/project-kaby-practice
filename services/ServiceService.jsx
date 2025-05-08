import ServiceCardRepo from "../repositories/ServiceCardRepo";
import UserService from "./UserService";
import AuthenticationService from "./AuthenticationService";
class ServiceService{
    constructor(){
        this.repo = new ServiceCardRepo();
    }

    // async makeService(serviceData){
    //     // TODO: add logic
    //     const id = await new AuthenticationService().loggedInUserId();
    //     console.log("logged in user", id);
    //     const roleId = await new UserService().getRoleIdUsingAuth(id);
    //     console.log("role user",roleId);
    //     const serviceOwner = {
    //         ...serviceData, owner_id : roleId.id
    //     };
    //     const {data,error} = await this.repo.create(serviceOwner);
    //     return {data,error};
    // }
    async createService(serviceData){
        console.log("serviceData", serviceData);
        const data = await this.repo.create(serviceData);
        console.log("data", data);
        return data;
    }
}
export default ServiceService;