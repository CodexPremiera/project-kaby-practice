
import BarangayAppointmentModel from "../models/BarangayAppointment.Model";
class BarangayAppointmentRepo{
    constructor(supabase){
        this.tableName = 'BarangayAppointment';
        this.supabase = supabase;
    }

    async getAll(){
        const {data, error} = await this.supabase.from(this.tableName).select('*');
        if(error) throw new Error(error.message);
        return data;
    }

    async create(appointmentData){
        const {barangay_name, city, region,email, message} = appointmentData;
        const appointment = new BarangayAppointmentModel(barangay_name,email,city,message,"Pending",region);

        const {data,error} = await this.supabase.from(this.tableName).insert([appointment]).select();
        if(error){
            console.log(error);
            return error;
        }
        console.log("data",data);
        return data;

    }
    async getById(appId){
        const {data,error} = await this.supabase.from(this.tableName).select('*').eq("id",appId);
        
        // console.log(data);
        return data;
        
    }
    async update(id,fields){
        console.log(id,"this is id");
        console.log(fields,"this is fields");

        const {data,error} = await this.supabase.from(this.tableName).update(fields).eq('id',id).select();
        console.log(data, "data or repo");
        if (error) {
            console.log(error);
            throw error;
        }
        return data;
    }

}
export default BarangayAppointmentRepo;