import { NextResponse } from "next/server";
// import UserService from "../../../services/UserService";
import AuthenticationService from "../../../services/AuthenticationService";    
const authService = new AuthenticationService();
// const userService = new UserService();
export async function GET(request) {  
    try {
        const loggedInUserId = await authService.loggedInUserId();
        // const data = await userService.getAllUsers();
        console.log("logged in user id", loggedInUserId);
        return NextResponse.json({ data: data });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({message: "Hello from user"})
}