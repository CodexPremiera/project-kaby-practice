// import React, { useState } from "react";

// interface AddManagerModalProps {
//   onClose: () => void;
//   non_managers: Citizen[] | null;
//   refresh : () => void;
// }
// interface Citizen {
// 	citizen_id: string;
// 	first_name: string;
// 	last_name: string;
// 	middle_name?: string;
// 	position: string;
// 	barangay_id : string;
// 	barangay_address:string;
// 	worker_id : string;
// }[];

// const AddManagerModal = ({ onClose, non_managers,refresh }: AddManagerModalProps) => {
// 	console.log("citizens", non_managers);
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});

	
// 	console.log(non_managers, "these are non managers");
// 	const handleAssign = async (citizenId: string) => {
// 		const selectedRole = selectedRoles[citizenId]
// 		console.log(selectedRole, "thius");
// 		if(!non_managers) return null;
// 		if(!selectedRole){
// 			alert("Please select a role");
// 			return;
// 		}
		
// 		try{
// 			const res = await fetch("/api/barangay_settings/access_role",{
// 				method : "POST",
// 				headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     worker_id: non_managers[0].worker_id ,
// 					access_role: selectedRole,
//                 }),
// 			})
// 			const data = await res.json();
//             console.log("Successfully assigned:", data);
// 			alert("Assigned Successfully");
// 			onclose;
// 			refresh();
// 		}catch(error){
// 			console.log(error);
// 			alert("failed");
// 		}

// 	}
    
// 	return (
// 		<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 ">
// 		<div className="relative flex flex-col h-auto w-full max-w-[600] rounded-[20px] bg-primary p-8 gap-4">
// 			<h2 className="text-xl font-semibold text-center border-b border-gray/20 pb-1 h4">
// 			Worker List
// 			</h2>

// 			<input
// 			type="text"
// 			placeholder="Search citizen..."
// 			value={searchTerm}
// 			onChange={(e) => setSearchTerm(e.target.value)}
// 			className="px-3 py-2 border rounded w-full"
// 			/>
			
// 			<div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
				
// 			{non_managers?.map((citizen) => (
// 				<div
// 				key={citizen.citizen_id}
// 				className="flex items-center justify-between py-2 border-b border-gray-200"
// 				>
// 				<div className="w-[40%]">
// 					{citizen.last_name}, {citizen.first_name} {citizen.middle_name || ""}
// 				</div>
// 				<div className="w-[40%]">
// 					{citizen.position}
// 				</div>

// 				<select
// 					value={selectedRoles[citizen.citizen_id] || ""}
// 					onChange={(e) =>
// 					setSelectedRoles((prev) => ({
// 						...prev,
// 						[citizen.citizen_id]: e.target.value,
// 					}))
// 					}
// 					className="border border-gray-300 px-2 py-1 rounded"
// 				>
// 					<option value="">None</option>
// 					<option value="Chief Operator">Chief Operator</option>
// 					<option value="Citizen Manager">Citizen Manager</option>
// 					<option value="Service Manager">Service Manager</option>
// 				</select>

				

// 				<button
// 					className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// 					onClick={() => handleAssign(citizen.citizen_id)}
					

// 				>
// 					Submit
// 				</button>
// 				</div>
// 			))}
// 			</div>

// 			<button
// 			onClick={onClose}
// 			className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
// 			>
// 			Close
// 			</button>
// 		</div>
// 		</div>
// 	);
// };

// export default AddManagerModal;


import React, { useState } from "react";

interface AddManagerModalProps {
  onClose: () => void;
  non_managers: Citizen[] | null;
  managers: Citizen[] | null;
  refresh: () => void;
}

interface Citizen {
  citizen_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  position: string;
  barangay_id: string;
  barangay_address: string;
  worker_id: string;
  access_role?: string;
}

const AddManagerModal = ({ onClose, non_managers, managers, refresh }: AddManagerModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});
  const [view, setView] = useState<"non_managers" | "managers">("non_managers");

  const list = view === "non_managers" ? non_managers : managers;

  const filteredList = list?.filter((citizen) =>
    `${citizen.first_name} ${citizen.last_name} ${citizen.middle_name || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
	const handleDelete = async (citizen :Citizen) =>{
    console.log("deleted");
    try{
      const res = await fetch ("/api/barangay_settings/access_role",{
        method : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          worker_id: citizen.worker_id
        })
      });
      if(!res.ok){
        throw new Error("Failed to delete");
      }
      alert("Successfully unassigned role citizen");
      refresh();
    }catch(error){
      alert("failed to delete");
    }
  }
  console.log(non_managers, "these are non managers");
  const handleSubmit = async (citizen: Citizen) => {
	console.log(citizen, "this is the citizen chosen");
    const selectedRole = selectedRoles[citizen.citizen_id];
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    try {
      const res = await fetch("/api/barangay_settings/access_role", {
        method: view === "non_managers" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        worker_id: citizen.worker_id ,
        //   worker_id: citizen.worker_id,
        //   citizen_id: citizen.citizen_id,
          access_role: selectedRole,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      console.log("Success:", data);
      alert(`${view === "non_managers" ? "Assigned" : "Updated"} successfully`);
      refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative flex flex-col h-auto w-full max-w-[700px] rounded-[20px] bg-primary p-8 gap-4">
        <h2 className="text-xl font-semibold text-center border-b border-gray/20 pb-1 h4">
          {view === "non_managers" ? "Available Workers" : "Current Managers"}
        </h2>

        <div className="flex justify-between mb-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded w-[70%]"
          />
          <button
            onClick={() =>
              setView((prev) => (prev === "non_managers" ? "managers" : "non_managers"))
            }
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            {view === "non_managers" ? "View Managers" : "View Non-Managers"}
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {filteredList?.map((citizen) => (
            <div
              key={citizen.citizen_id}
              className="flex items-center justify-between py-2 border-b border-gray-200"
            >
              <div className="w-[35%]">
                {citizen.last_name}, {citizen.first_name} {citizen.middle_name || ""}
              </div>
              <div className="w-[30%]">{citizen.position}</div>

              <select
                value={selectedRoles[citizen.citizen_id] || citizen.access_role || ""}
                onChange={(e) =>
                  setSelectedRoles((prev) => ({
                    ...prev,
                    [citizen.citizen_id]: e.target.value,
                  }))
                }
                className="border border-gray-300 px-2 py-1 rounded"
              >
                <option value="">None</option>
                <option value="Chief Operator">Chief Operator</option>
                <option value="Citizen Manager">Citizen Manager</option>
                <option value="Service Manager">Service Manager</option>
              </select>

              <button
                className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleSubmit(citizen)}
              >
                {view === "non_managers" ? "Assign" : "Update"}
              </button>
			  {view === "managers" && (
                <button
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(citizen)}
                >Unassign</button>
              )}
            
			  
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
