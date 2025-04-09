"use client";

import { useState } from "react";
import BadgeRequest from "./BadgeRequest";
import CitizenVerification from "./CitizenVerification";
import Dashboard from "./Dashboard";
import ReportedUser from "./ReportedUser";

const CitizenDesk = () => {
	const [activeButton, setActiveButton] = useState("Dashboard");

	const handleNavClick = (component: string) => {
		setActiveButton(component);
	};

	return (
		<div>
			<div className="bg-secondary text-white p-4">
				<h2 className="h4 font-semibold mx-4">Citizen Desk</h2>
			</div>
			<div>
				<nav className="flex flex-start space-x-6 mt-4 mx-4">
					<button
						className={`text-3xs px-4 py-2 ${
							activeButton === "Dashboard" ? "border-b-2 border-secondary" : ""
						} hover:text-secondary hover:border-secondary`}
						onClick={() => handleNavClick("Dashboard")}
					>
						Dashboard
					</button>
					<button
						className={`text-3xs px-4 py-2 ${
							activeButton === "CitizenVerification"
								? "border-b-2 border-secondary"
								: ""
						} hover:text-secondary hover:border-secondary`}
						onClick={() => handleNavClick("CitizenVerification")}
					>
						Citizen Verification
					</button>
					<button
						className={`text-3xs px-4 py-2 ${
							activeButton === "BadgeRequest"
								? "border-b-2 border-secondary"
								: ""
						} hover:text-secondary hover:border-secondary`}
						onClick={() => handleNavClick("BadgeRequest")}
					>
						Badge Request
					</button>
					<button
						className={`text-3xs px-4 py-2 ${
							activeButton === "ReportedUser"
								? "border-b-2 border-secondary"
								: ""
						} hover:text-secondary hover:border-secondary`}
						onClick={() => handleNavClick("ReportedUser")}
					>
						Reported User
					</button>
				</nav>
			</div>
			<div className="max-h-[calc(100vh-100px)] overflow-y-auto p-4">
				<div className="space-y-4">
					{activeButton === "Dashboard" && <Dashboard />}
					{activeButton === "CitizenVerification" && <CitizenVerification />}
					{activeButton === "BadgeRequest" && <BadgeRequest />}
					{activeButton === "ReportedUser" && <ReportedUser />}
				</div>
			</div>
		</div>
	);
};

export default CitizenDesk;
