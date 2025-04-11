"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const BadgeRequest = () => {
	const data = [
		{
			name: "John Doe",
			service_attended: "Mangrove Tree Planting",
			status: "Give Badge",
		},
		{
			name: "John Doe",
			service_attended: "Mangrove Tree Planting",
			status: "Give Badge",
		},
		{
			name: "John Doe",
			service_attended: "Mangrove Tree Planting",
			status: "Give Badge",
		},
		{
			name: "John Doe",
			service_attended: "Mangrove Tree Planting",
			status: "Give Badge",
		},
	];

	const [statuses, setStatuses] = useState(data.map((d) => d.status));
	const [selected, setSelected] = useState<boolean[]>(
		new Array(data.length).fill(false)
	);

	const handleStatusChange = (index: number, newStatus: string) => {
		const updated = [...statuses];
		updated[index] = newStatus;
		setStatuses(updated);
	};

	const handleCheckboxChange = (index: number) => {
		const updatedSelection = [...selected];
		updatedSelection[index] = !updatedSelection[index];
		setSelected(updatedSelection);
	};

	return (
		<div className="min-h-auto flex justify-center pt-4">
			<div className="w-full p-4 shadow-sm bg-white rounded-lg mx-8">
				<table className="min-w-full divide-y divide-gray-200 text-sm">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								<input
									type="checkbox"
									onChange={() => {
										const newSelected = selected.every((value) => value)
											? new Array(data.length).fill(false)
											: new Array(data.length).fill(true);
										setSelected(newSelected);
									}}
									checked={selected.every((value) => value)}
								/>
							</th>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Name
							</th>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Service Attended
							</th>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Status
							</th>
							<th className="px-4 py-2 text-left font-medium text-gray-700">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{data.map((row, i) => (
							<tr key={i}>
								<td className="px-4 py-2">
									<input
										type="checkbox"
										checked={selected[i]}
										onChange={() => handleCheckboxChange(i)}
									/>
								</td>
								<td className="px-4 py-2">{row.name}</td>
								<td className="px-4 py-2">{row.service_attended}</td>
								<td className="px-4 py-2">
									<select
										value={statuses[i]}
										onChange={(e) => handleStatusChange(i, e.target.value)}
										className="w-32 px-2 py-2 bg-primary text-sm border-1 rounded-[10px]"
									>
										<option value="Give Badge">Give Badge</option>
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

export default BadgeRequest;
