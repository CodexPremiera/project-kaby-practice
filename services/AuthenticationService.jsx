import AuthenticationRepo from "../repositories/AuthenticationRepo";

class AuthenticationService{
    constructor(supabase){
        this.repo = new AuthenticationRepo(supabase);
    }
    async registerUser(userDetails){
        const {email, password, confirmPass} = userDetails;
        if(password !== confirmPass) {
            console.log("hello");
        }
        const {data,error} = await this.repo.signUp({email,password});
        console.log("service", data);
        return {data,error};
    }
    async signInUser(userCredentials){
        // console.log(userCredentials);
        console.log("signing in user", userCredentials);
        const {data,error} = await this.repo.loginUser(userCredentials);

        return {data,error};
    }
    async loggedInUserId(){
        const data = await this.repo.getLoggedInUserId();
        return data;
    }
}
export default AuthenticationService;