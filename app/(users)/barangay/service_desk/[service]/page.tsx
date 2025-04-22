import ServiceTab from "@/components/service_desk/ServiceTab";
import ServiceDesk from "@/features/ServiceDesk";

const Page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen gap-3">
			<ServiceTab />
			<ServiceDesk />
		</div>
	);
};

export default Page;
