import React, { useState } from "react";

interface AssignWorkerModalProps {
  onClose: () => void;
  citizens: Citizen[] | null;
}
interface Citizen {
    id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    barangay_id: string;
    is_worker: boolean;


}



const AssignWorkerModal = ({ onClose, citizens }: AssignWorkerModalProps) => {
    console.log("citizens", citizens);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});
    const [positions, setPositions] = useState<Record<string, string>>({});


    const filteredCitizens = citizens
    ?.filter((citizen) => !citizen.is_worker) // exclude workers
    .filter((citizen) =>
        `${citizen.first_name} ${citizen.last_name} ${citizen.middle_name || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const handleAssign = async (citizenId: string) => {
        const position = positions[citizenId];
        // const barangay_id = citizens[citizenId];
        const citizen = citizens?.find((c) => c.id === citizenId);
        
        if (!citizen) {
            alert("Citizen not found.");
            return;
        }
        console.log("this is le citizen", citizen.id);

        const barangay_id = citizen.barangay_id;

        if (!position) {
            alert("Please enter a position before submitting.");
            return;
        }

        try {
            const res = await fetch("/api/barangay_settings/barangay_worker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    citizen_id: citizen.id,
                    position,
                    barangay_id,
                }),
            });

            if (!res.ok) {
            throw new Error(`Failed to assign: ${res.status}`);
            }

            const data = await res.json();
            console.log("Successfully assigned:", data);
            alert(`Successfully assigned ${citizenId} as ${position}`);
        } catch (error) {
            console.error("Error assigning citizen:", error);
            alert("Failed to assign worker. Check the console for details.");
        }
    };


    console.log("filteredCitizens", filteredCitizens);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 ">
        <div className="relative flex flex-col h-auto w-full max-w-[1000] rounded-[20px] bg-primary p-8 gap-4">
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

     
                <input
                    type="text"
                    placeholder="Position"
                    value={positions[citizen.id] || ""}
                    onChange={(e) =>
                        setPositions((prev) => ({
                        ...prev,
                        [citizen.id]: e.target.value,
                        }))
                    }
                    className="px-3 py-2 border rounded w-[200px]"
                />
                

                <button
                    className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleAssign(citizen.id)}

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

export default AssignWorkerModal;
