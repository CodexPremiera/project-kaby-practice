import { NextResponse } from "next/server";
import ServiceService from "../../../services/ServiceService";
import AuthenticationService from "../../../services/AuthenticationService";
import UserService from "../../../services/UserService";
import CitizenService from "../../../services/CitizenService";

const servService = new ServiceService();
const authService = new AuthenticationService();
const roleService = new UserService();
const citizenService = new CitizenService();
export async function POST(request){
    try{
        const body = await request.json();
        const{
            title,
            description,
            price,
            available_date,
            closed_at,
            status,
            location,
            background
        } = body;

        // const loggedInUserId = await authService.loggedInUserId();
        // const getProfileId  = await roleService.getRoleIdUsingAuth(loggedInUserId);
        // console.log(getProfileId.user_id, "profileid");
        // const getCitizenId = await citizenService.getCitizenIdUsingRole(getProfileId.id);
        // console.log(getCitizenId, "citizendi");
        const {data,error} = await servService.makeService({title,description,price,available_date,closed_at,status,location});
        // const {data,error} = await servService.makeService({title,description,price,available_date,closed_at,status,location,owner_id :getCitizenId.id});
        if(error){
            console.log(error);
        }
        return NextResponse.json({hello:"word"});
    }catch(err){
        console.log(err);
    }
}