import ProfileTab from "@/components/profile/ProfileTab";
import Home from "@/features/Home";

const Page = () => {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<div className="flex-1">
				<Home/>
			</div>
		</div>
	);
};

export default Page;
