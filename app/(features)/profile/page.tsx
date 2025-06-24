"use client"

import CitizenProfileTab from "@/components/profile/CitizenProfileTab";
import {useUser} from "@/app/context/UserContext";
import {redirect} from "next/navigation";

const Page = () => {
	const user = useUser();
	if (user.role === "citizen") {
		redirect("/services")
	}

	return (
		<div className="flex flex-col w-full min-h-screen">
			<CitizenProfileTab />
			<div className="flex-1"></div>
		</div>
	);
};

export default Page;
