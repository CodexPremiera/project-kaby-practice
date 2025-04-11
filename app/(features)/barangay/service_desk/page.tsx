import "react-tabs/style/react-tabs.css";
import ViewService from "@/components/service/ViewService";

const ServiceDesk = () => {
	return (
		<div>
			<div className="h-screen">
				<div className="flex-1 overflow-y-auto  px-4 md:px-8 py-4 pb-40 md:pb-30 space-y-10">
					<ViewService />
				</div>
			</div>
		</div>
	);
};

export default ServiceDesk;
