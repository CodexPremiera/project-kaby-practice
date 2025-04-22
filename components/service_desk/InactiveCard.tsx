import React from "react";
import Image from "next/image";

const InactiveCard = () => {
	return (
		<div className="flex flex-col card-custom w-full max-w-xs opacity-50">
			<div className="relative w-full h-[140px] rounded-lg overflow-hidden ">
				<Image
					src="/assets/img/service-img.png"
					alt="service image"
					fill
					className="object-cover"
				/>
			</div>

			<div className="px-4 py-4">
				<p className="h6 font-semibold">Bondy's Photography</p>
				<div className="flex gap-2 h6 flex-wrap">
					<p>by: Bondy Might</p>
					<p>• Personal</p>
				</div>
			</div>
		</div>
	);
};

export default InactiveCard;
