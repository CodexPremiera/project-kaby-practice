import ServiceModel from "../models/ServiceModel";
import { createClient } from "@supabase/supabase-js";
import BaseRepo from "./BaseRepo";


class ServiceCardRepo extends BaseRepo{ 
    constructor(){
        super("services");
    }

    // async create(serviceData){
    //     console.log(serviceData);
    //     const {data,error} = await supabase.from(this.tableName).insert(serviceData);
    //     return {data,error};
    // }
    async getByName(service_name){
        const {data,error} = await supabase.from(this.tableName).select('*').eq('service_name',service_name).single();
        return {data,error};
    }
}

export default ServiceCardRepo;