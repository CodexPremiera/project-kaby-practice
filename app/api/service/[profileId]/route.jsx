import { NextResponse } from "next/server";
import ServiceRepo from "../../../../repositories/ServiceRepo";
// TODO: i am using repo but make service for services 

const repo = new ServiceRepo();
export async function GET(request, {params}){
    const profileId = (await params).profileId;
    console.log("went here", profileId);

    const data = await repo.getServicesByUser(profileId);
    console.log("data", data);
    
    return NextResponse.json(data);
}