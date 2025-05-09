import ServiceCardRepo from "../repositories/ServiceCardRepo";
class ServiceService{
    constructor(supabase){
        this.repo = new ServiceCardRepo(supabase);
    }
    async getAllServices(){
        const services = await this.repo.getAll();
        return services;
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