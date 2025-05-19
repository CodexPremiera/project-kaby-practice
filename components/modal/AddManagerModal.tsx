import React, { useState } from "react";

interface AddManagerModalProps {
  onClose: () => void;
  citizens: Citizen[] | null;
}
interface Citizen {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
}

const AddManagerModal = ({ onClose, citizens }: AddManagerModalProps) => {
	console.log("citizens", citizens);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});

	const filteredCitizens = citizens?.filter((citizen) =>
		`${citizen.first_name} ${citizen.last_name} ${citizen.middle_name || ""}`
		.toLowerCase()
		.includes(searchTerm.toLowerCase())
	);
	console.log("filteredCitizens", filteredCitizens);

	return (
		<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
		<div className="relative flex flex-col h-auto w-md rounded-[20px] bg-primary p-8 gap-4">
			<h2 className="text-xl font-semibold text-center border-b border-gray/20 pb-1 h4">
			Citizen List
			</h2>

			<input
			type="text"
			placeholder="Search citizen..."
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			className="px-3 py-2 border rounded w-full"
			/>

			<div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
			{filteredCitizens?.map((citizen) => (
				<div
				key={citizen.id}
				className="flex items-center justify-between py-2 border-b border-gray-200"
				>
				<div className="w-[40%]">
					{citizen.last_name}, {citizen.first_name} {citizen.middle_name || ""}
				</div>

				<select
					value={selectedRoles[citizen.id] || ""}
					onChange={(e) =>
					setSelectedRoles((prev) => ({
						...prev,
						[citizen.id]: e.target.value,
					}))
					}
					className="border border-gray-300 px-2 py-1 rounded"
				>
					<option value="">None</option>
					<option value="Chief Operator">Chief Operator</option>
					<option value="Document Admin">Document Admin</option>
					<option value="Account Manager">Account Manager</option>
				</select>

				<button
					className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
					onClick={() =>
					console.log(
						`Assigning ${selectedRoles[citizen.id] || "No role"} to ${citizen.id}`
					)
					}
				>
					Submit
				</button>
				</div>
			))}
			</div>

			<button
			onClick={onClose}
			className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
			>
			Close
			</button>
		</div>
		</div>
	);
};

export default AddManagerModal;
