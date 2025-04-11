"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const CitizenVerification = () => {
	const data = [
		{
			name: "John Doe",
			date: "2025-04-09",
			email: "john@example.com",
			status: "Pending",
		},
		{
			name: "Jane Smith",
			date: "2025-04-08",
			email: "jane@example.com",
			status: "Approve",
		},
		{
			name: "Alice Brown",
			date: "2025-04-07",
			email: "alice@example.com",
			status: "Pending",
		},
		{
			name: "Alice Brown",
			date: "2025-04-07",
			email: "alice@example.com",
			status: "Pending",
		},
		{
			name: "Alice Brown",
			date: "2025-04-07",
			email: "alice@example.com",
			status: "Pending",
		},
		{
			name: "Alice Brown",
			date: "2025-04-07",
			email: "alice@example.com",
			status: "Pending",
		},
		{
			name: "Alice Brown",
			date: "2025-04-07",
			email: "alice@example.com",
			status: "Pending",
		},
		{
			name: "Alice Brown",
			date: "2025-04-07",
			email: "alice@example.com",
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
					<thead className="bg-gray-100 ">
						<tr>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Name
							</th>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Date
							</th>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Email
							</th>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Status
							</th>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 ">
						{data.map((row, i) => (
							<tr key={i}>
								<td className="px-4 py-2">{row.name}</td>
								<td className="px-4 py-2">{row.date}</td>
								<td className="px-4 py-2">{row.email}</td>
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

export default CitizenVerification;
