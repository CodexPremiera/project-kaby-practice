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
}
export default UserRepo;