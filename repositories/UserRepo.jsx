import { createClient } from "@supabase/supabase-js";
import UserModel from "../models/UserModel";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

class UserRepo{
    constructor(){
        this.tableName = 'userroles';
    }
    async create(userData){
        // const user = new UserModel(userData);
        const {data,error} = await supabase.from(this.tableName).insert(userData).select().single();
        return {data,error};
    }
    async getById(id){
        const {data,error} = await supabase.from(this.tableName).select('*').eq('user_id',id).single();
        if(error){
            console.log(error);
        }
        console.log(data.id,"aaa");
        return {data,error};
    }
    async getIdUsingAuth(id){
        console.log("id taken in user repo", id);
        const {data,error} = await supabase.from(this.tableName).select("id").eq('user_id', id).single();
        if(error) console.log(error);
        console.log(data, "should be 54e");
        return data;
    }
}
export default UserRepo;