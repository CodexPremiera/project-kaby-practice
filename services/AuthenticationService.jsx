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
        // console.log("signing in user", userCredentials);
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
        // const data= await this.repo.createUserAccountInvite({email,password});
        // console.log("service", data);
        // TODO: ONCE NAA NAY EMAIL THEN SEND THE PASSWORD TO THE EMAIL, SEARCH INVITEUSERBYEMAIL() 
        // ====================================================================
        const data = await this.repo.createUserAccountInvite({email});
        // ==============================================================
        return data;
    }
    async setUserPassword(password){
        const {data} = await this.repo.setPassword(password);
        return data;
    }
    async getUserEmail(id){
        const email = await this.repo.getEmail(id);
        return email;
    }
    async changeUserPassword(currentPassword, newPassword) {
        const userId = await this.loggedInUserId();
        const email = await this.getUserEmail(userId);

        if (!email) {
            return { success: false, error: "Unable to find user email." };
        }
        const { error: authError } = await this.repo.loginUser({
            email,
            password: currentPassword,
        });
        if (authError) {
            console.log(authError, "auth error");
            return { success: false, error: "Current password is incorrect." };
        }
        if (currentPassword === newPassword) {
            return { success: false, error: "New password cannot be the same as the old password." };
        }
        const result = await this.repo.changePassword(newPassword);
        if (result.error) {
            return { success: false, error: result.error.message || "Failed to update password." };
        }
        return { success: true, message: "Password changed successfully." };
    }

    async hasPassword(){
        const hasPass = await this.repo.getIfUserHasPassword();
        return hasPass;
    }
    async setAllPasswordTrue(){
        const {updated} = await this.repo.setAllUserPassword();
        return updated;
    }

}
export default AuthenticationService;