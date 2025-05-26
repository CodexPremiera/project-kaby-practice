import Logo from "@/components/Logo";
import Link from "next/link";
import AppointmentClientForm from "./AppointmentClient";
import CitizenRegisterForm from "@/app/(root)/register/citizen/CitizenRegisterClient";
import AuthWrapper from "@/components/auth/AuthWrapper";
const AppointmentForm = () => {
	return (
		<AuthWrapper>
			<h1 className="font-semibold text-center">Book an Appointment</h1>
			<AppointmentClientForm />

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
