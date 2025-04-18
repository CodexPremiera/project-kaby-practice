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

    async loginUser(userCredentials){
        const {email,password} = userCredentials;
        const {data,error} = await supabase.auth.signInWithPassword({email,password});
        // console.log(data);
        if(error){
            console.log(error);
        }
        return {data,error};
    }
    async getUserById(id){

    }
    async getLoggedInUserId(){
        const{data,error} = await supabase.auth.getUser();
        // console.log(data.user.id);
        return data.user.id;
    }
}
export default AuthenticationRepo;

