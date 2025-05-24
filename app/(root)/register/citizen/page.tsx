import Link from "next/link";
import CitizenRegisterForm from "./CitizenRegisterClient";
import AuthWrapper from "@/components/auth/AuthWrapper";

const RegisterForm = () => {
	return (
		<AuthWrapper>
			<h1 className="font-semibold text-center">Create account</h1>
			<CitizenRegisterForm/>

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

export default RegisterForm;
