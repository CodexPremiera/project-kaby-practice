import BarangayAppointmentRepo from "../repositories/BarangayAppointmentRepo";

class BarangayAppointmentService {
    constructor(supabase){
        this.repo = new BarangayAppointmentRepo(supabase);
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
    async createAppointment(appDetails){
        const data = await this.repo.create(appDetails);
        console.log("this is data",data);
        
        return data;
    }
    async updateAppointment(body) {
        console.log("this is boday",body)
        const {id, ...fieldsUpdate} = body;
        if(!id || Object.keys(fieldsUpdate).length == 0){
            throw new Error('Id and atleast one field required to update')
        }
        console.log(id, "fields updata");
        const data = await this.repo.update(body.id, fieldsUpdate);
        console.log(data, " data of service");
        return data;
    }
}
export default BarangayAppointmentService;