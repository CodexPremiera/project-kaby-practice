import AuthenticationRepo from "../repositories/AuthenticationRepo";

class AuthenticationService{
    constructor(){
        this.repo = new AuthenticationRepo();
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
        console.log(userCredentials);
        const {data,error} = await this.repo.loginUser(userCredentials);
        return {data,error};
    }
    async loggedInUserId(){
        return await this.repo.getLoggedInUserId();
    }
}
export default AuthenticationService;