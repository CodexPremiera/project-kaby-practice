"use client";

import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const ViewServiceLayout = ({ children }: LayoutProps) => {
	return (

		<div className="flex-4 rounded-[10px] bg-white w-full">{children}</div>
	);
};

export default ViewServiceLayout;
