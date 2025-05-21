import React from "react";
import PostComposer from "./PostComposerForm";
import PostCard from "./PostCard";
import SwitchTab from "@/components/ui/tabs/SwitchTab";

type UserProps = {
	userId: string;
	userRole: string;
};

const postsData = [
	{
		avatarUrl: "/assets/img/profile/bg-profile.png",
		username: "Barangay Labangon",
		handle: "labangoncebu",
		timeAgo: "1h",
		postText:
			"Just launched a new project! 🚀 Check it out and let us know what you think. #webdev #nextjs #buildinpublic",
		imageUrl: "/assets/img/service-img.png",
		likes: 64,
		views: 1200,
	},
	// Add more post objects as needed
];

const featuredCitizensData = [
	{
		name: "Jasmine Junelle Agutaya Atayadafsdaf asdf",
		email: "jamminejunelle.agutaya@email.codddddddddddm",
		avatar: "/assets/img/profile/bg-profile.png",
	},
	// Add more featured citizens here
];

const FeaturedCitizenCard = ({
	name,
	email,
	avatar,
}: {
	name: string;
	email: string;
	avatar: string;
}) => (
	<div className="flex items-start gap-3 w-full">
		<img src={avatar} alt="user profile" className="w-9 rounded-full" />
		<div className="flex flex-col justify-center items-start">
			<span className="text-primary font-medium max-w-[13rem] truncate overflow-hidden whitespace-nowrap">
				{name}
			</span>
			<span className="text-secondary text-xs max-w-[13rem] truncate overflow-hidden whitespace-nowrap">
				{email}
			</span>
		</div>
	</div>
);

const Post: React.FC<UserProps> = ({ userId, userRole }) => {
	return (
		<div className="flex w-full justify-between px-6 gap-6">
			{/* Left Tabs */}
			<div className="flex flex-col gap-8">
				<SwitchTab active={true} className="w-fit">
					All posts
				</SwitchTab>
				<SwitchTab active={false} className="w-fit">
					Pinned
				</SwitchTab>
			</div>

			{/* Center Feed */}
			<div className="mx-auto md:max-w-[480px] lg:max-w-[600px] min-h-screen flex flex-col pb-20 items-center gap-1 sm:gap-4">
				{userRole === "barangay" && <PostComposer />}
				<div className="flex flex-col gap-4 sm:gap-6 py-4 justify-center">
					{postsData.map((post, index) => (
						<PostCard key={index} {...post} />
					))}
				</div>
			</div>

			{/* Right Sidebar */}
			<div className="flex flex-col items-center gap-6 p-6 w-80 max-w-xs rounded-2xl background-1 h-fit">
				{/* Header */}
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-end gap-2 h-5 w-full">
						<svg
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.49534 13.5878L9.99949 12.069L12.5037 13.5878L11.838 10.7387L14.0527 8.83768L11.1422 8.5795L9.99949 5.90691L8.85684 8.5795L5.94625 8.83768L8.16096 10.7387L7.49534 13.5878ZM9.99949 20L7.04755 17.0591H2.93984V12.9514L0 9.99949L2.93984 7.04755V2.93984H7.04755L9.99949 0L12.9514 2.93984H17.0591V7.04755L20 9.99949L17.0591 12.9514V17.0591H12.9514L9.99949 20Z"
								fill="#FFA52F"
							/>
						</svg>
						<span className="font-bold text-primary w-[9.5625rem] truncate">
							Month of March
						</span>
					</div>
					<span className="text-secondary text-sm text-center">
						Thank you for your active participation!
					</span>
				</div>

				{/* Featured Citizens */}
				<div className="flex flex-col items-center gap-4 h-fit w-full overflow-hidden">
					{featuredCitizensData.map((citizen, index) => (
						<FeaturedCitizenCard key={index} {...citizen} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Post;
