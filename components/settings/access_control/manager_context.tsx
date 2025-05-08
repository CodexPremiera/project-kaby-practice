// contexts/ManagerContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Manager {
  name: string;
  position: string;
  role: string;
  added: string;
  photo: string;
}

interface ManagerContextType {
  managers: Manager[];
  removeManager: (index: number) => void;
  editManager: (index: number, updated: Partial<Manager>) => void;
}

const ManagerContext = createContext<ManagerContextType | undefined>(undefined);

export const useManagerContext = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error('useManagerContext must be used within ManagerProvider');
  }
  return context;
};

export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [managers, setManagers] = useState<Manager[]>([
    {
      name: "Derrick C. Yap",
      position: "Barangay Captain",
      role: "Chief Operator",
      added: "2025-02-10T11:00:00+08:00",
      photo: "https://placehold.co/34x34?text=DY"
    },
    {
      name: "Maricel R. Lim",
      position: "Secretary",
      role: "Document Admin",
      added: "2025-04-01T09:00:00+08:00",
      photo: "https://placehold.co/34x34?text=ML"
    },
    {
      name: "Jonas P. Uy",
      position: "Treasurer",
      role: "Account Manager",
      added: "2025-03-20T14:30:00+08:00",
      photo: "https://placehold.co/34x34?text=JU"
    }
  ]);

  const removeManager = (index: number) => {
    setManagers((prev) => prev.filter((_, i) => i !== index));
  };

  const editManager = (index: number, updated: Partial<Manager>) => {
    setManagers((prev) =>
      prev.map((mgr, i) => (i === index ? { ...mgr, ...updated } : mgr))
    );
  };

  return (
    <ManagerContext.Provider value={{ managers, removeManager, editManager }}>
      {children}
    </ManagerContext.Provider>
  );
};
