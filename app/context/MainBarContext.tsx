"use client";

import { createContext, useContext } from "react";

// TODO: FRICK DI MUWORK ANG MAIN BAR SAMOKA 

export type MainBarContext = {
    barangay_id: string |null;
    barangay_name : string | null;
    barangay_address: string |null;
    badge_stock: number |null;
    badge_given : number |null;
    officials_count: number |null;
    residents_count: number |null;
    profile_pic: string |null;
};

export const MainBarContext = createContext<MainBarContext | null>(null);

export const useMainBarContext = () => useContext(MainBarContext);
