"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const BarangayAppointment = () => {
	const data = [
		{
			barangay: "Labangon",
			city: "Cebu City",
			region: "Region 7",
			date: "2025-04-09",
			email: "john@example.com",
			message: "message",
			status: "Pending",
		},
	];

	const [statuses, setStatuses] = useState(data.map((d) => d.status));

	const handleStatusChange = (index: number, newStatus: string) => {
		const updated = [...statuses];
		updated[index] = newStatus;
		setStatuses(updated);
	};

	return (
		<div className="min-h-auto flex justify-center pt-4">
			<div className="w-full p-4 shadow-sm bg-white rounded-lg mx-8">
				<table className="min-w-full divide-y divide-gray-200 text-sm">
					<thead className="">
						<tr>
							<th className="px-4 py-2 text-left font-medium">Barangay</th>
							<th className="px-4 py-2 text-left font-medium">City</th>
							<th className="px-4 py-2 text-left font-medium">Region</th>
							<th className="px-4 py-2 text-left font-medium">Date</th>
							<th className="px-4 py-2 text-left font-medium">Email</th>
							<th className="px-4 py-2 text-left font-medium">Message</th>
							<th className="px-4 py-2 text-left font-medium ">Status</th>
							<th className="px-4 py-2 text-left font-medium">Action</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{data.map((row, i) => (
							<tr key={i}>
								<td className="px-4 py-2">{row.barangay}</td>
								<td className="px-4 py-2">{row.city}</td>
								<td className="px-4 py-2">{row.region}</td>
								<td className="px-4 py-2">{row.date}</td>
								<td className="px-4 py-2">{row.email}</td>
								<td className="px-4 py-2">{row.message}</td>
								<td className="px-4 py-2">
									<select
										value={statuses[i]}
										onChange={(e) => handleStatusChange(i, e.target.value)}
										className="w-32 px-2 py-2 bg-primary text-sm border-1 rounded-[10px]"
									>
										<option value="Pending">Pending</option>
										<option value="Accept">Accept</option>
										<option value="Reject">Reject</option>
									</select>
								</td>
								<td className="px-4 py-2">
									<Button variant="table">Submit</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BarangayAppointment;
