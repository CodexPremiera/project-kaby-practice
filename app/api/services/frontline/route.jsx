//export async function GET() {
//	const supabase = await createClient();
//	const authService = new AuthenticationService(supabase);
//	const serviceService = new ServiceService(supabase);
//	const userService = new UserService(supabase);
//	const citizenService = new CitizenService(supabase);

// Get current logged-in user ID
//	const user_id = await authService.loggedInUserId();
//	console.log("Logged in user id: ", user_id);
// Get user role
//	const role = await userService.getUserRole(user_id);
//	console.log("User role:", role);

//Getting the barangayUserID
//	if (role === "citizen") {
//		const id = userroles.getId(user_id)
//		const barangay = citizenService.getBarangay(id) //getBarangay will return the BarangayName (text)

//Using the text get the barangay user_id

//	} else if (role === "barangay") {

//	}

//	const services = await serviceService.getFrontlineServices(barangayUserId);

//}

//match the user_id to CitizenProfile user_id -> get the barangay(text)
//match barangay(text) == BarangayProfile.barangayName (text)
//BarangayProfile.user_id == userroles.id -> userroles.user_id  == Services.owner

//BarangayProfile.user_id == userroles.id -> userroles.user_id  == Services.owner
