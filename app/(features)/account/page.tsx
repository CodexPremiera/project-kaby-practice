"use client";

import React from 'react';
import CitizenSettings from "@/components/settings/citizen_settings";
import BarangaySettings from "@/components/settings/barangay_settings";
import {useUser} from "@/app/context/UserContext";


function Page() {
	const { role } = useUser();
	console.log(role)

	return (
		<>
			{role === "citizen" ? <CitizenSettings /> : <BarangaySettings /> }
		</>
	)
}

export default Page;