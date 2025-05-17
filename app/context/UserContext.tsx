"use client";

import { createContext, useContext } from "react";

export type UserContextType = {
  userId: string | null;
  role: "admin" | "barangay" | "citizen" | null;
  barangayName?: string | null;  // Only for barangay
  adminData?: object | null;     // Optional for admin
  citizenData?: object | null;   // Optional for citizen
};

export const UserContext = createContext<UserContextType>({
  userId: null,
  role: null,
  barangayName: null,
  adminData: null,
  citizenData: null,
});

export const useUser = () => useContext(UserContext);
