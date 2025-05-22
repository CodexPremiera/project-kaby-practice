// "use client";

import React from 'react';
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