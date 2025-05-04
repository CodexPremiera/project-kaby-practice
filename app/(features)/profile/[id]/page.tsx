import React from "react";
import CitizenProfileTab from "@/components/profile/CitizenProfileTab";

interface ProfilePageProps {
	params: { id: string };
}
const Profile = ({ params }: ProfilePageProps) => {
	return (
		<div>
			<CitizenProfileTab params={params} />
		</div>
	);
};

export default Profile;
