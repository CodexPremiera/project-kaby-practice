import AuthenticationService from "@/services/AuthenticationService";
import CitizenService from "@/services/CitizenService";
import TemporaryAccountService from "@/services/TemporaryAccountService";
import UserService from "@/services/UserService";
import {createClient} from "@/utils/supabase/server";
import { NextResponse } from "next/server";
export async function PUT(request) {
	const supabase = await createClient();
	const authService = new AuthenticationService(supabase);
    const citizenService = new CitizenService(supabase);
    const tempAccountService = new TemporaryAccountService(supabase);
    const userService = new UserService(supabase);

    const body = await request.json();
    const tempAcc = await tempAccountService.updateTempAccount(body.id, { status: body.status });
    if(body.status === "Rejected"){
            return NextResponse.json({
            message: "Rejected or Pending",
            citizenDesk: body,
        });
    }
    // console.log("this is body: ", body);
    // console.log("this is data: ", tempAcc);

    const details = await tempAccountService.getById(body.id);
    console.log("this is details: ", details);
    // console.log("this is details: ", details);
    const accountDetails = {
        email: details.email,
    };
    const account = await authService.createAccount(accountDetails);
    // console.log("this account", account)
    const user_id = account.user.id;
    // console.log(user_id, "this user id");
    const citizenProfileData = {
        ...details,
        user_id,
    };
    const {data,error} = await citizenService.createCitizenProfile(citizenProfileData);
    const user = await userService.createUser({user_id, role:"citizen"});

    return NextResponse.json({
        message: "Successfully created an account",
        citizenDesk: body,
    });
}