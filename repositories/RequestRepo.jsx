<<<<<<< HEAD
import RequestCardModel from "../models/RequestCardModel";
import BaseRepo from "./BaseRepo";

export default class RequestRepo extends BaseRepo{
        constructor(supabase){
                super("Services", supabase)
                this.supabase = supabase
        }
        async getAllRequests(){
                const apps = await this.repo.getAll()
                return apps
        }
        async getRequestsByUser(user_id){
                console.log(user_id, "the user id")
                const { data: data1, error: error1 } = await this.supabase
                        .from("Requests")
                        .select("citizen_id")
                        .eq("id", user_id)
                        .single()
                console.log("data1", data)

                const { data, error } = await this.supabase
                        .from(this.tableName)
                        .select()
                        .eq("citizen_id", data1.user_id)
                
                if(error) console.log(error)
                return data
        }

        async getRequestsByService(service_id){
                console.log(service_id, "the service")
                const { data: data1, error: error1} = await this.supabase
                        .from("Services")
                        .select("id")
                        .eq("id", service_id)
                        .single()
                console.log("data1", data)
                return data
        }

        async create(requestServiceData){
                try{
                        const newRequestServiceData = new RequestCardModel

                        
                }catch(error){
                        console.error("Error in adding the service to tracker")
                        return { error: error.message }
                }
        }
}
=======
import BaseRepo from "./BaseRepo";

export default class RequestRepo extends BaseRepo {
	constructor(supabase) {
		super("Requests", supabase);
	}

	async getAllRequests() {
		return await this.repo.getAll();
	}

	async getById(id) {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select()
			.eq("id", id)
			.single();
		if (error) return { error };
		return { data };
	}
}
>>>>>>> origin/module3-backend
