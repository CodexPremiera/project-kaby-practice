import ProfileTab from "@/components/profile/ProfileTab";
import TopSection from "@/components/top_section/TopSection";

const Page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<ProfileTab />
			<div className="flex-1">
				<TopSection title="Your Services" />
			</div>
		</div>
	);
};

export default Page;
