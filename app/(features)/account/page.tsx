// "use client";

import React from 'react';
import CitizenSettings from "@/components/settings/citizen_settings";
import BarangaySettings from "@/components/settings/barangay_settings";
import {useUser} from "@/app/context/UserContext";
import AccountRouter from "./AccountRouter";



async function Page() {

	return(
		<AccountRouter />
	)

	// return (
	// 	<>
	// 		{role === "citizen" ? <CitizenSettings /> : <BarangaySettings /> }
	// 	</>
	// )
}

export default Page;