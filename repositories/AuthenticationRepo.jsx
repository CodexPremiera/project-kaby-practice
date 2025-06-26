import supabaseAdmin from "@/utils/supabase/admin";

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
// =================== temporary since email verif doenst work ===============
	// async createUserAccountInvite(userDetails) {
	// 	const { email, password } = userDetails;
	// 	const { data, error } = await supabaseAdmin.auth.admin.createUser({
	// 		email,
	// 		password,
	// 		email_confirm: true,

	// 	});
	// 	console.log("repo", data);
	// 	if (error) {
	// 		console.log(error);
	// 	}
	// 	return data;
	// }
// ==========================================================================
// =====================email verification =======================================

	async createUserAccountInvite(userDetails) {
		const { email } = userDetails;
		console.log("this is email", email);
		console.log("this is userDetails", userDetails);


		// const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
		// 	email,
		// 	email_confirm: false,
		// 	user_metadata :{has_password :false}
		// });

		// if (createError) {
		// 	console.log("User creation error:", createError);
		// 	return { error: createError };
		// }
		const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);
		if (inviteError) {
			console.log("Invite error:", inviteError);
			return { error: inviteError };
		}

		console.log("Invite sent:", inviteData);
		return { data: inviteData };
	}
// ==================================================================================
	async getEmail(id){
		const { data: { user }, error } = await this.supabase.auth.getUser()

		if (error) {
			console.error(error)
			return null
		}

		return user?.email
	}
	async changePassword(newPassword) {
		const { data, error } = await this.supabase.auth.updateUser({
			password: newPassword,
		});

		if (error) {
			console.error(error);
			return { error };
		}

		return { success: true, data };
	}
	async setPassword(password){
		const { data, error } = await this.supabase.auth.updateUser({
			password: password,
			data:{has_password:true}

		});

		if (error) {
			console.error(error);
			return { error };
		}
		return { success: true, data };	
	}
	async getIdUsingEmail(email) {
    	const {data, error} = await this.supabase.from('email_user_view').select("user_id").eq("email",email).single();
		console.log(data,"this is email", email);
		if(error){
			return {error};
		}
		return data.user_id;

	}


	// registration magic link part
	// async signInWithEmail() {
	// 	const { data, error } = await supabase.auth.signInWithOtp({
	// 		email: 'valid.email@supabase.io',
	// 		options: {
	// 		// set this to false if you do not want the user to be automatically signed up
	// 		shouldCreateUser: false,
	// 		emailRedirectTo: 'https://example.com/welcome',
	// 		},
	// 	})
	// }
	async getIfUserHasPassword(){
		const {data,error} = await this.supabase.auth.getUser();
		if(error) throw error;
		console.log("password isss", data);
		return data?.user.user_metadata?.has_password;
	}

	async setAllUserPassword() {
		const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();

		if (listError) {
			console.error("Failed to list users:", listError);
			return { error: listError };
		}

		const updated = [];

		for (const user of users.users) {
			const metadata = user.user_metadata || {};

			if (metadata.has_password === true) continue;

			const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
			user_metadata: { ...metadata, has_password: true }
			});

			if (updateError) {
			console.error(`Failed to update user ${user.email}:`, updateError);
			} else {
			updated.push(user.email);
			}
		}

		console.log("Updated users:", updated);
		return { updated };
	}

	
}
export default AuthenticationRepo;
