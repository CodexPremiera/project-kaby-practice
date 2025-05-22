import AuthenticationRepo from "../repositories/AuthenticationRepo";
import crypto from "crypto"

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
        // console.log("service", data);
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
    async createAccount(userDetails){
        const {email} = userDetails;
        const password = crypto.randomBytes(6).toString("base64").slice(0, 8);
        console.log("this is password", password);
        const data= await this.repo.createUserAccountInvite({email,password});
        // console.log("service", data);
        // TODO: ONCE NAA NAY EMAIL THEN SEND THE PASSWORD TO THE EMAIL, SEARCH INVITEUSERBYEMAIL() 
        return data;
    }
    async getUserEmail(id){
        const email = await this.repo.getEmail(id);
        return email;
    }
}
export default AuthenticationService;