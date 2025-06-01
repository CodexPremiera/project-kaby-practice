"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ManagerList from "@/components/settings/access_control/manager_list";
import AddManagerModal from "@/components/modal/AddManagerModal";
import AssignWorkerModal from "@/components/modal/AssignWorkerModal";
import { useBarangayContext } from "@/app/context/BarangayContext";


const AssignWorkers: React.FC = () => {
  const {barangayId} = useBarangayContext();
  const [showWorker, setWorkerModal] = useState<boolean>(false);
  const [showManager, setManagerModal] = useState<boolean>(false);
  const [view, setView] = useState<"citizens" | "workers">("citizens");


  const handleOpenModal1 = () => setWorkerModal(true);
  const handleCloseModal1 = () => setWorkerModal(false);
  const handleOpenModal2 = () => setManagerModal(true);
  const handleCloseModal2 = () => setManagerModal(false);
// =============
  console.log("barangya id", barangayId);
  const [managers, setManagers] = useState(null);
  const [nonManagers, setNonManagers] = useState(null);
  const [citizenProfiles, setCitizenProfiles] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("userId in settings router", barangayId);

  const fetchBarangay = async () => {
        try {
          const [citizenRes, workerRes, accessRes,managerRes,nonManagerRes] = await Promise.all([
            fetch(`/api/barangay_settings/access_control/${barangayId}`, { method: "GET", cache: "no-store" }),
            fetch(`/api/barangay_settings/barangay_worker/${barangayId}`, { method: "GET", cache: "no-store" }),
            fetch(`/api/barangay_settings/access_role/${barangayId}`, { method: "GET", cache: "no-store" }),
            fetch(`/api/barangay_settings/managers/${barangayId}`, { method: "GET", cache: "no-store" }),
            fetch(`/api/barangay_settings/non_managers/${barangayId}`, { method: "GET", cache: "no-store" }),
          ])

          const [citizenData, workerData,accessData,managersData,nonManagerData] = await Promise.all([
            citizenRes.json(), workerRes.json(),accessRes.json(),managerRes.json(),nonManagerRes.json()
          ]) 
          setCitizenProfiles(citizenData.data);
          
        } catch (err) {
          console.error("Failed to fetch barangay profile:", err);
        } finally {
          console.log("wompers")
          setLoading(false);
        }
    };
  useEffect(() => {
    

    fetchBarangay();
  }, [ barangayId]);



  // ===============

  return (
    // <ManagerProvider>
    <div>
      <div className="flex flex-row justify-between items-center gap-2 w-full ">
        <h1
          className="flex flex-col justify-center text-3xl font-semibold leading-[12px] hidden lg:block">
          {view === "citizens" ? "Assign citizens" : "Update roles"}
        </h1>
        <div className="flex gap-2">
          <ButtonSecondary onClick={handleOpenModal1}>Assign Workers</ButtonSecondary>
          <ButtonSecondary onClick={handleOpenModal2}>Assign Managers</ButtonSecondary>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex w-full items-center justify-between h-9 gap-2 leading-[12px]">
          <div className="flex gap-3 w-[240px]">
            Manager
          </div>
          <div
            className="flex w-[180px] items-center gap-2.5">
            Role
          </div>
          <div
            className="flex w-[120px] items-center gap-2.5">
            Added
          </div>

          <div className="w-6"></div>
        </div>

        <ManagerList managers={managers}/>
      </div>
       {showWorker && <AssignWorkerModal citizens= {citizenProfiles} onClose={handleCloseModal1} refresh={fetchBarangay}/>}
       {showManager && <AddManagerModal non_managers = {nonManagers} onClose={handleCloseModal2} refresh={fetchBarangay} managers={managers}/>}
    {/* // </ManagerProvider> */}
    </div>
  );
}

export default AssignWorkers;
