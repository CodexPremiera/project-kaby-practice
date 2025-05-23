import Logo from "@/components/Logo";
import Link from "next/link";
import AppointmentClientForm from "./AppointmentClient";
const AppointmentForm = () => {
	return (
		<section className="flex flex-wrap xl:flex-nowrap">
			{/* Side Image */}
			<div className="relative w-full xl:w-1/2 h-[100vh] bg-hero bg-no-repeat bg-cover bg-center">
				<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>
				<div className="absolute top-4 left-4 z-20">
					<Logo />
				</div>
			</div>
			<div className="w-full xl:w-1/2 flex justify-center items-center">
				<div className="h-auto w-[420px] py-8 px-8 bg-primary rounded-[20px]">
					<p className="text-lg font-semibold text-center">
						Book an Appointment
					</p>
					<AppointmentClientForm />

					<div className="flex flex-col justify-between items-center mt-5">
						<p className="text-[12px]">Already have an account? </p>
						<Link href="/login" className="text-[12px] text-secondary mt-1">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AppointmentForm;
