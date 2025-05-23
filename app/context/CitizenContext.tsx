
"use client";

import { createContext, useContext } from "react";

export type CitizenContext = {
    citizenId: string | null;
    lastName: string | null;
    firstName: string | null;
    middleName: string | null;
    // citizenAddress: string | null;
    citizenProfilePic : string | null;
};

export const CitizenContext = createContext<CitizenContext | null>(null);

export const useCitizenContext = () => useContext(CitizenContext);
