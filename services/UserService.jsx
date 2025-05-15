import UserRepo from "../repositories/UserRepo";
import AuthenticationService from "./AuthenticationService";

class UserService {
	constructor(supabase) {
		this.repo = new UserRepo(supabase);
	}

	async createUser(userDetails) {
		const { data, error } = await this.repo.create(userDetails);
		console.log(data, "data2");
		if (error) {
			console.log(error);
		}
		return { data, error };
	}
	async getUserRole(user_id) {
		// const authService = new AuthenticationService();
		// const user_id = await authService.loggedInUserId();
		console.log(user_id, "the user id in service");
		const { data, error } = await this.repo.getById(user_id);
		console.log(data);
		if (error) {
			console.log(error);
		}
		return data.role;
	}
	async getRoleIdUsingAuth(id) {
		const user_id = await this.repo.getIdUsingAuth(id);
		return user_id;
	}

	async getUserById(id) {
		const { data, error } = await this.repo.getById(id);
		if (error) {
			console.log(error);
		}
		return data;
	}
	async getAllUsers() {
		const { data, error } = await this.repo.getAllUsers();
		if (error) {
			console.log(error);
		}
		return data;
	}
	
}
export default UserService;
