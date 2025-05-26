"use client";

import { ReactNode } from "react";
import { AccessRoleContext,AccessRoleContextType } from "@/app/context/AccessRoleContext";

type Props = {
  value: AccessRoleContextType | null;
  children: ReactNode;
};

export default function BarangayProvider({ value, children }: Props) {
  return <AccessRoleContext.Provider value={value}>{children}</AccessRoleContext.Provider>;
}
