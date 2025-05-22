// components/settings/SettingsRouter.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useBarangayContext } from "@/app/context/BarangayContext";
import CitizenSettings from "@/components/settings/citizen_settings";
import BarangaySettings from "@/components/settings/barangay_settings";

export default function SettingsRouter() {
  const { role } = useUser();
  const { barangayId } = useBarangayContext();

  const [managers, setManagers] = useState(null);
  const [nonManagers, setNonManagers] = useState(null);
  const [citizenProfiles, setCitizenProfiles] = useState(null);
  const [workers, setWorkers] = useState(null);
  const [accessRoles, setAccessRoles] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("userId in settings router", barangayId);

  useEffect(() => {
    const fetchBarangay = async () => {
      if (role === "barangay" && barangayId) {
        try {
          const [citizenRes, workerRes, accessRes,managerRes,nonManagerRes] = await Promise.all([
            fetch(`/api/barangay_settings/access_control/${barangayId}`, { method: "GET", cache: "no-store" }),
            fetch(`/api/barangay_settings/barangay_worker/${barangayId}`, { method: "GET", cache: "no-store" }),
            fetch(`/api/barangay_settings/access_role/${barangayId}`, { method: "GET", cache: "no-store" }),
            fetch(`/api/barangay_settings/managers/${barangayId}`, { method: "GET", cache: "no-store" }),
            fetch(`/api/barangay_settings/non_managers/${barangayId}`, { method: "GET", cache: "no-store" }),
          ])
          // fetch(`/api/barangay_settings/access_control/${barangayId}`, {
          // const res = await fetch(`/api/barangay_settings/access_control/${barangayId}`, {
          //   method: "GET",
          //   cache: "no-store",
          // });
          // if (!res.ok) {
          //   throw new Error(`Error: ${res.status}`);
          // }
          // const data = await res.json();
          // console.log("this is data",data);
          const [citizenData, workerData,accessData,managersData,nonManagerData] = await Promise.all([
            citizenRes.json(), workerRes.json(),accessRes.json(),managerRes.json(),nonManagerRes.json()
          ]) 
          //   const transformed = citizenData.data.map((citizen) => ({
          //     id: citizen.id,
          //     first_name: citizen.first_name,
          //     last_name: citizen.last_name,
          //     middle_name: citizen.middle_name,
          //     barangay_id: barangayId,
          //     is_worker: citizen.is_worker
          // }));

          // console.log("Transformed managers:", managersData);
          // setCitizenProfiles(transformed);
          setCitizenProfiles(citizenData);
          setAccessRoles(accessData);
          setWorkers(workerData);
          setManagers(managersData);
          setNonManagers(nonManagerData)
          console.log("womperzz")
        
        } catch (err) {
          console.error("Failed to fetch barangay profile:", err);
        } finally {
          console.log("wompers")
          setLoading(false);
        }
      }
    };

    fetchBarangay();
  }, [role, barangayId]);

  // if (loading) return <div>Loadingerz...</div>;
  if (role === "barangay" && citizenProfiles) {
    console.log("Barangay Profile:", citizenProfiles);
    return <BarangaySettings citizens={citizenProfiles.data} accessRoles={accessRoles.data} workers={workers.data} managers = {managers.data} non_managers={nonManagers.data}/>;
    // return <BarangaySettings citizens={null} accessRoles={null} workers={null} managers = {dataProfile}/>;
  }
  else if (role === "citizen") {
    console.log("paosk kaah eree")
    return <CitizenSettings />;
  }
}
