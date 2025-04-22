import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";

const ServiceTab = () => {
	return (
		<div className="w-full max-w-screen">
			<div className="flex items-center gap-2 pb-4 text-sm text-muted-foreground">
				<Link
					href="/barangay/service_desk"
					className="flex items-center gap-1 hover:text-secondary"
				>
					<RiArrowLeftLine className="text-lg" />
					<span>Services</span>
				</Link>
				<span>/</span>
				<span className="font-medium text-foreground">
					Katarungang Pambarangay
				</span>
			</div>

			<div className="flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-8 md:px-12 py-4 bg-white shadow rounded-lg">
				<div className="flex flex-col text-center lg:text-left my-4">
					<p className="text-xl font-semibold">Katarungang Pambarangay</p>
					<div className="flex gap-2 text-sm text-muted-foreground justify-center lg:justify-start">
						<p>Barangay Labangon</p>
						<p>• Government</p>
					</div>
				</div>

				<div className="flex gap-6 items-center py-4 w-full sm:w-auto justify-center sm:justify-end">
					<div className="text-sm flex items-center gap-1">
						<span className="font-semibold text-base">4.9</span>
						<span className="text-muted-foreground">rating</span>
					</div>
					<div className="text-sm flex items-center gap-1">
						<span className="font-semibold text-base">300</span>
						<span className="text-muted-foreground">availed</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceTab;
