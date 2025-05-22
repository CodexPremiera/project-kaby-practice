"use client";

import { useEffect, useState } from "react";
import BarangayDeskClient from "./BarangayDeskClient";

const BarangayDesk = () => {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		const fetchAppointments = async () => {
			const res = await fetch(`/api/admin/appointment`);
			const data = await res.json();

			if (!res.ok) {
				console.error(data.message);
				return;
			}

			setAppointments(data.data);
		};

		fetchAppointments();
	}, []);

	return <BarangayDeskClient appointments={appointments} />;
};

export default BarangayDesk;
