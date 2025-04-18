import { NextResponse } from "next/server";
import ServiceService from "../../../services/ServiceService";
import AuthenticationService from "../../../services/AuthenticationService";

const servService = new ServiceService();
const authService = new AuthenticationService();
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
            location
        } = body;

        const loggedInUserId = await authService.loggedInUserId();
        const {data,error} = await servService.makeService({title,description,price,available_date,closed_at,status,location,user_id :loggedInUserId });
        if(error){
            console.log(error);
        }
        return NextResponse.json({hello:"word"});
    }catch(err){
        console.log(err);
    }
}