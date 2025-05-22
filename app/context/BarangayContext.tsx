"use client";

import { createContext, useContext } from "react";

export type BarangayContextType = {
  barangayId: string | null;
  barangayName: string | null;
  barangayAddress: string | null;
  barangayProfilePic : string | null;
};

export const BarangayContext = createContext<BarangayContextType | null>(null);

export const useBarangayContext = () => useContext(BarangayContext);
