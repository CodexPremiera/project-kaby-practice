
"use client";

import { createContext, useContext } from "react";

export type AccessRoleContextType = {
    citizen_id : string | null;
    position : string | null;
    access_role : string | null;
};

export const AccessRoleContext = createContext<AccessRoleContextType | null>(null);

export const useAccessRoleContext = () => useContext(AccessRoleContext);
