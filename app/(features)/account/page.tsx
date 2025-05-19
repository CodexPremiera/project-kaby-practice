"use client";

import React from 'react';
import CitizenSettings from "@/components/settings/citizen_settings";
import BarangaySettings from "@/components/settings/barangay_settings";
import {useUserRole} from "@/context/UserRoleContext";


function Page() {
	const role = useUserRole();
	console.log(role)

	return (
		<>
			{role === "citizen" ? <CitizenSettings /> : <BarangaySettings /> }
		</>
	)
}

export default Page;