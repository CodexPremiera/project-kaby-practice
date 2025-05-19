"use client";

import { createContext, useContext } from "react";

export type BarangayContextType = {
  barangayName: string | null;
  barangayAddress: string | null;
};

export const BarangayContext = createContext<BarangayContextType | null>(null);

export const useBarangayContext = () => useContext(BarangayContext);
