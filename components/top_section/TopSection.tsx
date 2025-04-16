"use client";

import React from "react";

type TopSectionProps = {
	title: string;
};

function TopSection({ title }: TopSectionProps) {
	return (
		<div className="w-full max-w-screen py-4 px-8 border-b border-gray-200 bg-white">
			<div className="flex items-center justify-center lg:justify-start gap-2">
				<p className="text-lg font-semibold">{title}</p>
			</div>
		</div>
	);
}

export default TopSection;
