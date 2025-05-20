// UserContext.tsx
"use client";

import { createContext, useContext } from "react";

export type UserContextType = {
  userId: string | null;
  role: "admin" | "barangay" | "citizen" | null;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
