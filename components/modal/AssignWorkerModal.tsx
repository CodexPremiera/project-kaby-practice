import React, { useState } from "react";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonInverse from "@/components/ui/buttons/ButtonInverse";
import ButtonTab from "@/components/ui/tabs/ButtonTab";

import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";


interface Citizen {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  barangay_id: string;
  is_worker: boolean;
}

const AssignWorkerModal = ({ onClose, citizens, refresh }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positions, setPositions] = useState<Record<string, string>>({});
  const [view, setView] = useState<"citizens" | "workers">("citizens");
  const [modalType, setModalType] = useState<null | "success" | "error">(null);
  const [successMessage, setSuccessMessage] = useState("");


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
      setSuccessMessage("Successfully unassigned the citizen from their position.");
      setModalType("success");

    }catch(error){
      // alert("failed to delete");
    }
  } 
  const handleCloseModal = () => {
    setModalType(null);
    refresh();
    // onClose();
  };
  const handleSubmit = async (citizen: Citizen) => {
    const position = positions[citizen.id];

    if (!position) {
      setSuccessMessage(`Pkease select a position for ${citizen.first_name}.`);
      setModalType("error"); 

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
      
      setSuccessMessage(`${view === "citizens" ? "Assigned" : "Updated"} ${citizen.first_name} as ${position}`);
      setModalType("success");
      setPositions((prev) => ({ ...prev, [citizen.id]: "" }));

    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative flex flex-col h-auto w-full max-w-[800px] rounded-[20px] bg-primary p-8 gap-4">
        <h2 className="text-xl font-semibold text-center border-b border-gray/20 pb-1 h4">
          {view === "citizens" ? "Assign Citizen as Worker" : "Update Worker Role"}
        </h2>
      {modalType === "success" && (
        <SuccessModal
          title="Success"
          content={successMessage}
          onClose={handleCloseModal}
        />
      )}
      {modalType === "error" && (
        <ErrorModal
          title="Error"
          content={successMessage}
          onClose={handleCloseModal}
        />
      )}

        <div className="flex gap-3 items-center">
          <ButtonTab onClick={() => setView("citizens")} active={view === "citizens"}>Citizens</ButtonTab>
          <ButtonTab onClick={() => setView("workers")} active={view === "workers"}>Workers</ButtonTab>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-auto px-3 py-2 border border-secondary rounded-full w-[300px]"
          />
        </div>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {filteredCitizens?.map((citizen) => (
            <div key={citizen.id} className="flex items-center justify-between py-2 border-b border-gray-200">
              <div className="w-[40%]">
                {citizen.last_name}, {citizen.first_name} {citizen.middle_name || ""}
              </div>

              {/* <input
                type="text"
                placeholder="Position"
                value={positions[citizen.id] || ""}
                onChange={(e) =>
                  setPositions((prev) => ({
                    ...prev,
                    [citizen.id]: e.target.value,
                  }))
                }
                className="px-3 py-2 border border-secondary rounded-full w-[200px]"
              /> */}
              <select
                value={positions[citizen.id] || ""}
                onChange={(e) =>
                  setPositions((prev) => ({
                    ...prev,
                    [citizen.id]: e.target.value,
                  }))
                }
                className="px-3 py-2 border border-secondary rounded-full w-[200px] bg-white text-black"
              >
                <option value="" disabled>Select position</option>
                <option value="Captain">Captain</option>
                <option value="Councilor">Kagawad</option>
                {/* <option value="Secretary">Secretary</option> */}
              </select>
              {view === "workers" && (
                <ButtonSecondary onClick={() => handleDelete(citizen)}>
                  Unassign
                </ButtonSecondary>
              )}
              <ButtonInverse onClick={() => handleSubmit(citizen)}>
                {view === "citizens" ? "Assign" : "Update"}
              </ButtonInverse>
            </div>
          ))}
        </div>

        <ButtonPrimary onClick={onClose}>Close</ButtonPrimary>
      </div>
    </div>
  );
};

export default AssignWorkerModal;
