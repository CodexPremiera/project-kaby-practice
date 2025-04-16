// https://blog.mansueli.com/building-user-authentication-with-username-and-password-using-supabase#heading-tweaking-the-sign-in-route
// to sign in using username
// https://stackoverflow.com/questions/78550922/how-do-i-authorise-users-with-username-in-supabase
'use server'
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from 'next/server'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function POST(req){
    console.log("logging in");
    try{

        // console.log(req);
        const body = await req.json();
        const {username,password} = body;
        console.log("asdnausdaoidn");
        console.log(body);

        const {error} = await supabase.auth.signInWithPassword({email:username, password:password});

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
        if(error){
            console.log(error);
        }

        // check role of cit
        const {data:{user}} = await supabase.auth.getUser();
        console.log(user.id);
        const {data} = await supabase.from('userroles').select('role').eq('user_id',user.id);

        console.log( data[0].role);
        if(data[0].role ==="citizen"){
            console.log("brr brr patapim");
            revalidatePath('/citizen');
            // redirect('/citizen');
            return NextResponse.json({redirectTo: '/citizen'});
        }else{
            revalidatePath('/barangay');
            return NextResponse.json({redirectTo: '/barangay'});

            // return 
        }

    }catch(err){
        return new Response(JSON.stringify({error:'Internal server error'}), {status:500});
    }
}
export async function GET(req){
    return new Response({hello: "hello"});
}