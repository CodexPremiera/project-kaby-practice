import BarangayAppointmentRepo from "../repositories/BarangayAppointmentRepo";

class BarangayAppointmentService {
    constructor(){
        this.repo = new BarangayAppointmentRepo();
    }
    async getAllAppointments(){
        const apps = await this.repo.getAll();
        return apps;
    }
    async getAppointmentById(id){
        const app = await this.repo.getById(id);
        console.log("this is id", id);
        // console.log(app);
        return app;
    }
}
export default BarangayAppointmentService;