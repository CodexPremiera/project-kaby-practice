// components/settings/SettingsRouter.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useBarangayContext } from "@/app/context/BarangayContext";
import { useCitizenContext } from "@/app/context/CitizenContext";
import CitizenSettings from "@/components/settings/citizen_settings";
import BarangaySettings from "@/components/settings/barangay_settings";

export default function SettingsRouter() {
  const { role } = useUser();
  // const { barangayId } = useBarangayContext();
  // let {citizenId} = useCitizenContext();
  const citizenCtx = useCitizenContext();
  let citizenId = citizenCtx?.citizenId || null;


  //   console.log("barangya id", barangayId);
  // console.log("citcont", citizenId);
  // const [managers, setManagers] = useState(null);
  // const [nonManagers, setNonManagers] = useState(null);
  // const [citizenProfiles, setCitizenProfiles] = useState(null);
  // const [workers, setWorkers] = useState(null);
  // const [accessRoles, setAccessRoles] = useState(null);
  // const [loading, setLoading] = useState(true);
  // console.log("userId in settings router", barangayId);

  // const fetchBarangay = async () => {
  //     if (role === "barangay" && barangayId) {
  //       try {
  //         const [citizenRes, workerRes, accessRes,managerRes,nonManagerRes] = await Promise.all([
  //           fetch(`/api/barangay_settings/access_control/${barangayId}`, { method: "GET", cache: "no-store" }),
  //           fetch(`/api/barangay_settings/barangay_worker/${barangayId}`, { method: "GET", cache: "no-store" }),
  //           fetch(`/api/barangay_settings/access_role/${barangayId}`, { method: "GET", cache: "no-store" }),
  //           fetch(`/api/barangay_settings/managers/${barangayId}`, { method: "GET", cache: "no-store" }),
  //           fetch(`/api/barangay_settings/non_managers/${barangayId}`, { method: "GET", cache: "no-store" }),
  //         ])

  //         const [citizenData, workerData,accessData,managersData,nonManagerData] = await Promise.all([
  //           citizenRes.json(), workerRes.json(),accessRes.json(),managerRes.json(),nonManagerRes.json()
  //         ]) 
  //         setCitizenProfiles(citizenData);
  //         setAccessRoles(accessData);
  //         setWorkers(workerData);
  //         setManagers(managersData);
  //         setNonManagers(nonManagerData)
  //         console.log("womperzz")
        
  //       } catch (err) {
  //         console.error("Failed to fetch barangay profile:", err);
  //       } finally {
  //         console.log("wompers")
  //         setLoading(false);
  //       }
  //     }
  //   };
  // useEffect(() => {
    

  //   fetchBarangay();
  // }, [role, barangayId]);


  // if (loading) return <div>Loadingerz...</div>;
  if (role === "barangay" ) {
  // if (role === "barangay" && citizenProfiles) {
    // console.log("Barangay Profile:", citizenProfiles);
    return <BarangaySettings/>;
    // return <BarangaySettings citizens={null} accessRoles={null} workers={null} managers = {dataProfile}/>;
  }
  else if (role === "citizen") {
    console.log("paosk kaah eree");

    // return <CitizenSettings citizenId={"aaa"}/>;
    return <CitizenSettings citizenId={citizenId}/>;
  }
}
