import ServiceCardRepo from "../repositories/ServiceCardRepo";

class ServiceService{
    constructor(){
        this.repo = new ServiceCardRepo();
    }

    async makeService(serviceData){
        // TODO: add logic
        const {data,error} = await this.repo.create(serviceData);
        return {data,error};
    }
}
export default ServiceService;