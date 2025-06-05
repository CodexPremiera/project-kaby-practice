import Logo from "@/components/Logo";
import Link from "next/link";
import AppointmentClientForm from "./AppointmentClient";
import CitizenRegisterForm from "@/app/(root)/register/citizen/CitizenRegisterClient";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { createClient } from "@/utils/supabase/server";


const AppointmentForm = async () => {
	const supabase = await createClient();
	const { data: regions, error } = await supabase
		.from("regions")
		.select("id, name")
		.order("name");

  if (error) {
    console.error("Failed to load regions", error);
  }
//   console.log("this is regions",regions);

	return (
		<AuthWrapper>
			<h1 className="font-semibold text-center">Book an Appointment</h1>
			<AppointmentClientForm regions={regions || []}  />

			<p className="flex justify-center items-center gap-2 mt-5">
				<span>Already have an account?</span>
				<Link
					href="/login"
					className="text-secondary mt-1"
				>
					Login
				</Link>
			</p>
		</AuthWrapper>
	);
};

export default AppointmentForm;
