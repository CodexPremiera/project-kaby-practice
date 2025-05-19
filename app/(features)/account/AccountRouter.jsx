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

  const [citizenProfiles, setCitizenProfiles] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("userId in settings router", barangayId);

  useEffect(() => {
    const fetchBarangay = async () => {
      if (role === "barangay" && barangayId) {
        try {
          const res = await fetch(`/api/access_control/barangay_settings/${barangayId}`, {
            method: "GET",
            cache: "no-store",
          });
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          
          const data = await res.json();
          console.log("Response from fetch:", data);
          setCitizenProfiles(data.data);
        } catch (err) {
          console.error("Failed to fetch barangay profile:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBarangay();
  }, [role, barangayId]);

  if (loading) return <div>Loading...</div>;
  if (role === "barangay" && citizenProfiles) {
    console.log("Barangay Profile:", citizenProfiles);
    return <BarangaySettings citizens={citizenProfiles} />;
  }
  else if (role === "citizen") {
    return <CitizenSettings />;
  }
}
