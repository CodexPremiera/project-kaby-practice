import React from "react";
import Image from "next/image";

const ActiveServiceCard = () => {
	return (
		<div className="flex flex-col card-shadow-custom w-[260px]">
			{/* Image container with fixed height */}
			<div className="relative w-full h-[140px] rounded-lg overflow-hidden">
				<Image
					src="/assets/img/service-img.png"
					alt="service image"
					fill
					className="object-cover"
				/>
			</div>

			<div className="px-4 py-4">
				<p className="h6 font-semibold">Bondy's Photography</p>
				<div className="flex gap-2 h6">
					<p>by: Bondy Might</p>
					<p>• Personal</p>
				</div>
				<p className="text-[12px] text-black/50">
					This is a very brief description context
				</p>
			</div>
		</div>
	);
};

export default ActiveServiceCard;
