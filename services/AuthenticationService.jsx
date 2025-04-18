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
}
export default AuthenticationService;