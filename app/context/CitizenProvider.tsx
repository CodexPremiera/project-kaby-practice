"use client";

import { ReactNode } from "react";
import { CitizenContext } from "@/app/context/CitizenContext";
import type { CitizenContext as CitizenContextType } from "@/app/context/CitizenContext";

type Props = {
  value: CitizenContextType | null;
  children: ReactNode;
};

export default function CitizenProvider({ value, children }: Props) {
  return (
    <CitizenContext.Provider value={value}>
      {children}
    </CitizenContext.Provider>
  );
}
