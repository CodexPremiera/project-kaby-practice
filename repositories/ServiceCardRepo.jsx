import ServiceCardModel from "../models/ServiceModel";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

class ServiceCardRepo{
    constructor(){
        this.tableName = "ServiceCard";
    }

    async create(serviceData){
        console.log(serviceData);
        const {data,error} = await supabase.from(this.tableName).insert(serviceData);
        return {data,error};
    }
}

export default ServiceCardRepo;