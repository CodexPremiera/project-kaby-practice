import TopSection from "@/components/top_section/TopSection";
import ServiceDesk from "@/features/ServiceDesk";

const Page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<div className="flex-1">
				<TopSection title="Service Desk" />
				<ServiceDesk />
			</div>
		</div>
	);
};

export default Page;
