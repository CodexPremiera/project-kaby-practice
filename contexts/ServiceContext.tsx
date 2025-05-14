"use client";

import { createContext, useContext } from "react";

interface ServiceContextType {
	serviceId: string;
}

export const ServiceContext = createContext<ServiceContextType | undefined>(
	undefined
);

export const useService = () => {
	const context = useContext(ServiceContext);
	if (!context) {
		throw new Error("useService must be used within a ServiceProvider");
	}
	return context;
};
