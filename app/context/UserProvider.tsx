"use client";

import { ReactNode } from "react";
import { UserContext, UserContextType } from "@/app/context/UserContext";

type Props = {
  value: UserContextType;
  children: ReactNode;
};

export default function UserProvider({ value, children }: Props) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}