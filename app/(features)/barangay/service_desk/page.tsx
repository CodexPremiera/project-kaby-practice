import "react-tabs/style/react-tabs.css";
import ViewService from "@/components/service/ViewService";
import TopSection from "@/components/TopSection";

const ServiceDesk = () => {
	return (
		<div className="flex overflow-y-auto py-8 px-12 pb-40 sm:pb-12 ">
			<ViewService />
		</div>
	);
};

export default ServiceDesk;
