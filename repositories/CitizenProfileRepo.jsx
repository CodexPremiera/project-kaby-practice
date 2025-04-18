import { createClient } from "@supabase/supabase-js";
import CitizenModel from "../models/CitizenModel";
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

class CitizenProfileRepo{
    constructor(){
        this.tableName = 'CitizenProfile';
    }
    async create(citizenData){
        const citizen = new CitizenModel(citizenData);
        console.log(citizenData,"repo");
        const {data,error} = await supabase.from(this.tableName).insert([citizenData]).select();
        if(error){
            console.log(error);
        }
        return {data,error};

    }
}
export default CitizenProfileRepo;