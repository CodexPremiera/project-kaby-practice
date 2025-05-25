import React, { useState } from "react";

interface AssignWorkerModalProps {
  onClose: () => void;
  citizens: Citizen[] | null;
  // citizenPositions : Worker[] | null;
  refresh: () => void;
}

interface Citizen {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  barangay_id: string;
  is_worker: boolean;
}

const AssignWorkerModal = ({ onClose, citizens, refresh }: AssignWorkerModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positions, setPositions] = useState<Record<string, string>>({});
  const [view, setView] = useState<"citizens" | "workers">("citizens");

  const filteredCitizens = citizens
    ?.filter((c) => view === "citizens" ? !c.is_worker : c.is_worker)
    .filter((c) =>
      `${c.first_name} ${c.last_name} ${c.middle_name || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  const handleDelete = async (citizen :Citizen) =>{
    console.log("deleted");
    try{
      const res = await fetch ("/api/barangay_settings/barangay_worker",{
        method : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          citizen_id: citizen.id,
          barangay_id: citizen.barangay_id,
        })
      });
      if(!res.ok){
        throw new Error("Failed to delete");
      }
      alert("Successfully unassigned position citizen");
      refresh();
    }catch(error){
      alert("failed to delete");
    }
  } 
  const handleSubmit = async (citizen: Citizen) => {
    const position = positions[citizen.id];

    if (!position) {
      alert("Please enter a position before submitting.");
      return;
    }

    try {
      const res = await fetch("/api/barangay_settings/barangay_worker", {
        method: view === "citizens" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          citizen_id: citizen.id,
          position,
          barangay_id: citizen.barangay_id,
        }),
      });

      if (!res.ok) throw new Error(`Failed to ${view === "citizens" ? "assign" : "update"}: ${res.status}`);

      const data = await res.json();
      alert(`${view === "citizens" ? "Assigned" : "Updated"} ${citizen.first_name} as ${position}`);
      setPositions((prev) => ({ ...prev, [citizen.id]: "" })); 
      refresh();
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed. See console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative flex flex-col h-auto w-full max-w-[800px] rounded-[20px] bg-primary p-8 gap-4">
        <h2 className="text-xl font-semibold text-center border-b border-gray/20 pb-1 h4">
          {view === "citizens" ? "Assign Citizen as Worker" : "Update Worker Role"}
        </h2>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setView("citizens")}
            className={`px-4 py-2 rounded ${view === "citizens" ? "bg-blue-600 text-white" : "bg-white text-black"}`}
          >
            Citizens
          </button>
          <button
            onClick={() => setView("workers")}
            className={`px-4 py-2 rounded ${view === "workers" ? "bg-blue-600 text-white" : "bg-white text-black"}`}
          >
            Workers
          </button>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-auto px-3 py-2 border rounded w-[300px]"
          />
        </div>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {filteredCitizens?.map((citizen) => (
            <div key={citizen.id} className="flex items-center justify-between py-2 border-b border-gray-200">
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
                onClick={() => handleSubmit(citizen)}
              >
                {view === "citizens" ? "Assign" : "Update"}
              </button>
              {view === "workers" && (
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

export default AssignWorkerModal;
