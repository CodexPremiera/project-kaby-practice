// https://blog.mansueli.com/building-user-authentication-with-username-and-password-using-supabase#heading-tweaking-the-sign-in-route
// to sign in using username
// https://stackoverflow.com/questions/78550922/how-do-i-authorise-users-with-username-in-supabase
'use server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from 'next/server'
import AuthenticationService from "../../../../services/AuthenticationService";
import UserService from "../../../../services/UserService";

const authService = new AuthenticationService();
const userService = new UserService();

export async function POST(req){
    console.log("logging in");
    try{

        // console.log(req);
        const body = await req.json();
        const {username,password} = body;


        // const {error} = await supabase.auth.signInWithPassword({email:username, password:password});
        const {data:data1,error:error1} = await authService.signInUser(body);
        // make login include username too uncomment babaw for email only

        // const {data} = await supabase.functions.invoke('sign-in',{
        //     body:{
        //         email,
        //         password,
        //     }
        // });
        // const {error} = await supabase.auth.setSession({
        //     access_token: data.access_token,
        //     refresh_token: data.refresh_token
        // });
        // ===================;
        if(error1){
            console.log(error1);
        }
        console.log("wenthere");

        // check role of cit

        const user_id = await authService.loggedInUserId();
         const role = await userService.getUserRole();

        console.log(role);

        if(role ==="citizen"){
            console.log("brr brr patapim");
            revalidatePath('/citizen');
            // redirect('/citizen');
            return NextResponse.json({redirectTo: '/citizen'});
        }else{
            revalidatePath('/barangay');
            return NextResponse.json({redirectTo: '/barangay'});

           // return 
        }
        // return NextResponse.json({hello:"word"});

    }catch(err){
        return new Response(JSON.stringify({error:'Internal server error'}), {status:500});
    }
}
export async function GET(req){
    return new Response({hello: "hello"});
}