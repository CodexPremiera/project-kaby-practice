// "use client";

// import { createContext, useContext } from "react";

// export type BarangayContextType = {
//   barangayName: string | null;
//   barangayAddress: string | null;

// };

// export const BarangayContext = createContext<BarangayContextType | null>(null);

// export const useBarangayContext = () => {
//   const context = useContext(BarangayContext);
//   if (!context) {
//     throw new Error("useBarangayContext must be used within a BarangayProvider");
//   }
//   return context;
// };