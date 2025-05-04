import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";

interface BackTopSectionProps {
	title: string;
	serviceId: string;
}

const BackTopSection: React.FC<BackTopSectionProps> = ({
	title,
	serviceId,
}) => (
	<div className="w-full sm:w-[95%] md:bg-transparent md:pl-0 pl-4 bg-white flex justify-between items-center pt-2">
		<div className="flex items-center gap-2 pb-4 text-sm text-muted-foreground">
			<Link href="/services" className="flex items-center gap-1">
				<RiArrowLeftLine className="text-lg" />
				<span className="hover:text-secondary">Services</span>
			</Link>
			<span>/</span>
			<Link
				href={`/services/${serviceId}/request`}
				className="flex items-center gap-1"
			>
				<span className="hover:text-secondary">Request</span>
			</Link>
			<span>/</span>
			<Link
				href={`/services/${serviceId}/edit`}
				className="flex items-center gap-1"
			>
				<span className="text-foreground text-secondary">{title}</span>
			</Link>
		</div>
	</div>
);

export default BackTopSection;
