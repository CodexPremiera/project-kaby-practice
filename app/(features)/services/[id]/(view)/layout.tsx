"use client";

import React, { ReactNode } from "react";
import AroundYou from "@/components/home/search/AroundYou";
import GeneralPublic from "@/components/home/search/GeneralPublic";
import ViewServiceSidebar from "@/components/services/view/ViewServiceSidebar";

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ id: string }>;
}

const ViewServiceLayout = ({ children, params }: LayoutProps) => {
	// Use React.use to unwrap the params Promise
	const { id } = React.use(params);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1 w-full">
					<ViewServiceSidebar serviceId={id} />
				</div>

				<div className="flex-4 rounded-[10px] bg-white w-full">{children}</div>
			</div>

			<div className="bg-white w-full rounded-[10px] py-8 px-6">
				<p className="text-lg font-semibold">Services Around You</p>
				<AroundYou />
				<p className="text-lg font-semibold pt-6">
					Services From General Public
				</p>
				<GeneralPublic />
			</div>
		</div>
	);
};

export default ViewServiceLayout;
