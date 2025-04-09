"use client";
import { useSwiper } from "swiper/react";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

const SliderBtn = () => {
	const swiper = useSwiper();
	return (
		<div className="w-max absolute bottom-2 right-2 flex gap-1 z-10">
			<button
				className="text-gray hover:text-secondary text-[22px] w-[40px] h-[44px] flex justify-center items-center transition-all cursor-pointer rounded-[10px]"
				onClick={() => swiper.slidePrev()}
			>
				<RiArrowLeftLine />
			</button>
			<button
				className="text-gray hover:text-secondary text-[22px] w-[40px] h-[44px] flex justify-center items-center transition-all cursor-pointer rounded-[10px]"
				onClick={() => swiper.slideNext()}
			>
				<RiArrowRightLine />
			</button>
		</div>
	);
};

export default SliderBtn;
