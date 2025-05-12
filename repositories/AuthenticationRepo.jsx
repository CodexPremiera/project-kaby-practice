class AuthenticationRepo {
	constructor(supabase) {
		this.supabase = supabase;
	}
	async loginUser(userCredentials) {
		const { email, password } = userCredentials;
		const { data, error } = await this.supabase.auth.signInWithPassword({
			email,
			password,
		});
		// console.log(data);
		console.log("nakalogin na ang user", data);
		if (error) {
			console.log(error);
		}
		return { data, error };
	}
	async signUp(userDetails) {
		const { email, password } = userDetails;
		const { data, error } = await this.supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			console.log("jep");
		}
		console.log("repo", data);
		return { data, error };
	}

	async getUserById(id) {}
	async getLoggedInUserId() {
		const { data, error } = await this.supabase.auth.getUser();
		console.log(data.user.id);
		return data.user.id;
	}
}
export default AuthenticationRepo;
