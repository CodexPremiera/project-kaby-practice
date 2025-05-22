class UserRepo{
    constructor(supabase){
        this.tableName = 'userroles';
        this.supabase = supabase;
    }
    async create(userData){
        // const user = new UserModel(userData);
        const {data,error} = await this.supabase.from(this.tableName).insert(userData).select().single();
        if(error){
            console.log(error);
        }
        return {data,error};
    }
    async getById(id){
        console.log(id, "the id in user repo");
        const {data,error} = await this.supabase.from(this.tableName).select('*').eq('user_id',id).single();
        if(error){
            console.log(error);
        }
        console.log(data.id,"aaa");
        return {data,error};
    }
    async getIdUsingAuth(id){
        console.log("id taken in user repo", id);
        const {data,error} = await this.supabase.from(this.tableName).select("id").eq('user_id', id).single();
        if(error) console.log(error);
        console.log(data, "should be 54e");
        return data;
    }
    async getAllUsers(){
        const {data,error} = await this.supabase.from(this.tableName).select('*');
        if(error){
            console.log(error);
        }
        return {data,error};
    }
}
export default UserRepo;