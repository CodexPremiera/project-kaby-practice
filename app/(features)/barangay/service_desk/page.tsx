import "react-tabs/style/react-tabs.css";
import ViewService from "@/components/service/ViewService";
import TopSection from "@/components/TopSection";

const ServiceDesk = () => {
	return (
		<div className="flex flex-col w-full h-screen overflow-hidden">
			<TopSection title="Service Desk" />
			<div className="flex-1 overflow-y-auto mt-[58px] py-2 px-6 pb-40 sm:pb-12 ">
				<ViewService />
			</div>
		</div>
	);
};

export default ServiceDesk;
