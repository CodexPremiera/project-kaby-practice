import BaseRepo from "./BaseRepo";

export default class ServiceRepo extends BaseRepo{
    constructor(supabase){
        super("ServiceCard",supabase);
        this.supabase = supabase;
    }
    async getAllServices(){
        
        const apps = await this.repo.getAll();
        return apps;
        
    }
    async getServicesByUser(user_id){
        console.log(user_id, "the user id");
        const {data:data1, error:error1} = await this.supabase.from("CitizenProfile").select("user_id").eq("id", user_id).single();
        console.log("data1", data1);
        
        const {data, error} = await this.supabase.from(this.tableName).select().eq("owner_id", data1.user_id);
        if(error) console.log(error);
        return data;
    }
    
}