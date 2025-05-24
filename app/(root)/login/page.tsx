import LoginClientForm from "./LoginClient";
import Link from "next/link";
import AuthWrapper from "@/components/auth/AuthWrapper";

const LoginForm = () => {
	return (
		<AuthWrapper>
			<h1 className="font-semibold text-center">Welcome back</h1>
			<LoginClientForm/>

			<p className="flex justify-center items-center gap-2 mt-5">
				<span>Don't have an account?</span>
				<Link
					href="/register/citizen"
					className="text-secondary mt-1"
				>
					Signup
				</Link>
			</p>
		</AuthWrapper>
	);
};

export default LoginForm;
