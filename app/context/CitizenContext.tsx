
"use client";

import { createContext, useContext } from "react";

export type CitizenContext = {
    citizenId: string | null;
    lastName: string | null;
    firstName: string | null;
    middleName: string | null;
    // citizenAddress: string | null;
    citizenProfilePic : string | null;
    // access_role :string | null;
};

export const CitizenContext = createContext<CitizenContext | null>(null);

// export const useCitizenContext = () => useContext(CitizenContext);
export const useCitizenContext = () => {
  const context = useContext(CitizenContext);

  if (!context) {
    // Return safe default values for non-citizen users
    return {
      citizenId: null,
      lastName: null,
      firstName: null,
      middleName: null,
      citizenProfilePic: null,
      access_role: null,
    };
  }

  return context;
};

