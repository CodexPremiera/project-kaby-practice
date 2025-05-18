"use client";

import { createContext, useContext } from "react";

export const UserContext = createContext({
  userId: null,
  role: null,
  barangayName: null,  // Only for barangay
  adminData: null,     // Optional for admin
  citizenData: null,   // Optional for citizen
});

export const useUser = () => useContext(UserContext);
