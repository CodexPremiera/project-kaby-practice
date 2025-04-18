import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

class AuthenticationRepo{
    async signUp(userDetails){
        const {email, password} = userDetails;
        const {data, error} = await supabase.auth.signUp({email,password});
        if(error) {
            console.log("je;;p");
        }
        console.log("repo", data);
        return {data,error};
    }
    async getUserById(id){

    }
}
export default AuthenticationRepo;

