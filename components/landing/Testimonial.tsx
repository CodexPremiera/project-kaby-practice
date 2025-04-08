import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SliderBtn from "./SliderBtn";

const Testimonial = () => {
	return (
		<Swiper className="bg-white card-custom w-full max-w-[630px] h-[200px] rounded-[20px]">
			{/* slider 1 */}
			<SwiperSlide>
				<div className="px-12 md:pl-[60px]  flex items-center gap-9 h-full">
					{/* avatar img */}
					<div className="relative hidden xl:flex w-[90px] h-[90px]">
						<Image
							src="/assets/img/testimonial/avatar.jpg"
							fill
							className="object-contain"
							quality={100}
							alt=""
						/>
					</div>
					{/* text */}
					<div className="flex-1 xl:max-w-[340px] flex flex-col gap-2">
						<p>
							As a Kapitan, I absolutely love the app! It has been incredibly
							helpful. I highly recommend it!
						</p>
						<p className="font-primary font-semibold text-secondarys">
							Kap. Derrick C. Yap
						</p>
					</div>
				</div>
			</SwiperSlide>
			{/* slider 2 */}
			<SwiperSlide>
				<div className="px-12 md:pl-[60px]  flex items-center gap-9 h-full">
					{/* avatar img */}
					<div className="relative hidden xl:flex w-[90px] h-[90px]">
						<Image
							src="/assets/img/testimonial/avatar.jpg"
							fill
							className="object-contain"
							quality={100}
							alt=""
						/>
					</div>
					{/* text */}
					<div className="flex-1 xl:max-w-[340px] flex flex-col gap-2">
						<p>
							As a Kapitan, I absolutely love the app! It has been incredibly
							helpful. I highly recommend it!
						</p>
						<p className="font-primary font-semibold text-secondary">
							Kap. Derrick C. Yap
						</p>
					</div>
				</div>
			</SwiperSlide>
			{/* slider 3 */}
			<SwiperSlide>
				<div className="px-12 md:pl-[60px]  flex items-center gap-9 h-full">
					{/* avatar img */}
					<div className="relative hidden xl:flex w-[90px] h-[90px]">
						<Image
							src="/assets/img/testimonial/avatar.jpg"
							fill
							className="object-contain"
							quality={100}
							alt=""
						/>
					</div>
					{/* text */}
					<div className="flex-1 xl:max-w-[340px] flex flex-col gap-2">
						<p>
							As a Kapitan, I absolutely love the app! It has been incredibly
							helpful. I highly recommend it!
						</p>
						<p className="font-primary font-semibold text-secondary">
							Kap. Derrick C. Yap
						</p>
					</div>
				</div>
			</SwiperSlide>
			{/* slider btns */}
			<SliderBtn />
		</Swiper>
	);
};

export default Testimonial;
