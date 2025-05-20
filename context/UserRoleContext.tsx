// context/UserRoleContext.tsx
"use client";

import { createContext, useContext } from "react";

type UserRole = "admin" | "barangay" | "citizen" | null;

const RoleContext = createContext<UserRole>(null);

export const useUserRole = () => useContext(RoleContext);

export const RoleProvider = ({ value, children }: { value: UserRole; children: React.ReactNode }) => {
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
