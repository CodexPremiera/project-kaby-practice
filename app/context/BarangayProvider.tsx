"use client";

import { ReactNode } from "react";
import { BarangayContext, BarangayContextType } from "@/app/context/BarangayContext";

type Props = {
  value: BarangayContextType | null;
  children: ReactNode;
};

export default function BarangayProvider({ value, children }: Props) {
  return <BarangayContext.Provider value={value}>{children}</BarangayContext.Provider>;
}
