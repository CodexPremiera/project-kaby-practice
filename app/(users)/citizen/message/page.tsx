import ProfileTab from "@/components/profile/BarangayProfileTab";
import TopSection from "@/components/top_section/TopSection";

const Page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<div className="flex-1">
				<TopSection title="Your Inbox" />
			</div>
		</div>
	);
};

export default Page;
