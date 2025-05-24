import Link from "next/link";
import PetitionForm from "./PetitionForm";
import AuthWrapper from "@/components/auth/AuthWrapper";

const Petition = () => {
	return (
		<AuthWrapper>
			<h1 className="font-semibold text-center">Make a petition</h1>
			<PetitionForm/>

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

export default Petition;
