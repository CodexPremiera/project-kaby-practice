import RequestCardModel from "../models/RequestCardModel";
import BaseRepo from "./BaseRepo";

export default class ServiceTrackerRepo extends BaseRepo{
        constructor(supabase){
                super("Services", supabase);
                this.supabase = supabase;
        }
        async getAllTrackedServices(){
                const apps = await this.repo.getAll();
                return apps;
        }
        // to get all services in the tracker
        async getTrackedServiceByRequest(service_id){
                console.log(service_id, "tracked service id");

        }

        
}