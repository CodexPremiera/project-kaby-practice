"use client";

import FadeIn from "@/components/ui/motion/FadeIn";
import HeroSearchBar from "@/components/landing/HeroSearchBar";
import {useIsMobile} from "@/app/hooks/useIsMobile";

const Hero = () => {
	const isMobile = useIsMobile();

	if (isMobile === undefined) return null; // avoid mismatch on first render

	return (
		<section className="h-fit md:h-screen bg-hero-gradient relative px-8 py-6 flex mt-16 md:mt-0">
			<div className="flex max-md:flex-col gap-0 grow max-w-[1440px] mx-auto z-10 max-md:pt-4">
				<div className="w-full flex flex-col items-center justify-center gap-12">
					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-2 max-md:text-center max-md:gx-2">
							<FadeIn direction={isMobile ? 'up' : 'right'} delay={0.2}>
								<h1>A bridge to public service</h1>
							</FadeIn>
							<FadeIn direction={isMobile ? 'up' : 'right'} delay={0.4}>
								<span className="lg:text-xl xl:text-2xl">Strengthening Communities, one Filipino at a time.</span>
							</FadeIn>
						</div>

						<FadeIn direction={isMobile ? 'up' : 'right'} delay={0.6}>
							<HeroSearchBar/>
						</FadeIn>
					</div>
				</div>

				<FadeIn direction={isMobile ? 'up' : 'left'} delay={isMobile ? 0.8 : 0.2}
								className="w-full flex justify-center gap-12">
					<img src="/assets/hero_light.svg" alt="" className="block dark:hidden w-[80%] lg:w-[90%] max-md:max-w-[540px]"/>
					<img src="/assets/hero_dark.svg" alt="" className="hidden dark:block w-[80%] lg:w-[90%] max-md:max-w-[540px]"/>
				</FadeIn>
			</div>
		</section>
	);
};

export default Hero;
