// components/settings/SettingsRouter.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useBarangayContext } from "@/app/context/BarangayContext";
import { useCitizenContext } from "@/app/context/CitizenContext";
import CitizenSettings from "@/components/settings/citizen_settings";
import BarangaySettings from "@/components/settings/barangay_settings";

export default function SettingsRouter() {
  const { role,has_password } = useUser();
  const citizenCtx = useCitizenContext();
  let citizenId = citizenCtx?.citizenId || null;
  console.log("has passowrd is ", has_password);

  const shouldShowModal = !has_password;

  if (role === "barangay" ) {
    return <BarangaySettings showSetPasswordModal={shouldShowModal}/>;
  }
  else if (role === "citizen") {
    console.log("paosk kaah eree");
    return <CitizenSettings citizenId={citizenId} showSetPasswordModal={shouldShowModal}/>;
  }
}
