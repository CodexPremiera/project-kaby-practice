"use client";

import FadeIn from "@/components/ui/motion/FadeIn";
import HeroSearchBar from "@/components/landing/HeroSearchBar";
import {useIsMobile} from "@/app/hooks/useIsMobile";

const Hero = () => {
	const isMobile = useIsMobile();

	if (isMobile === undefined) return null; // avoid mismatch on first render

	return (<section className="h-fit md:h-screen bg-hero-gradient relative px-8 py-6 flex">
			<div className="flex max-md:flex-col gap-16 grow max-w-[1440px] mx-auto z-10 max-md:pt-4">
				<div className="w-full flex flex-col max-md:items-center justify-center gap-12">
					<div className="flex flex-col gap-6 max-md:text-center max-md:gx-2">
						<FadeIn direction={isMobile ? 'up' : 'right'} delay={0.2}>
							<h1>A bridge to public service</h1>
						</FadeIn>
						<FadeIn direction={isMobile ? 'up' : 'right'} delay={0.4}>
							<span className="lg:text-xl xl:text-2xl">Strengthening Communities, one Filipino at a time.</span>
						</FadeIn>
					</div>

					<FadeIn direction={isMobile ? 'up' : 'right'} delay={0.6}>
						<HeroSearchBar />
					</FadeIn>
				</div>

				<FadeIn direction={isMobile ? 'up' : 'left'} delay={isMobile ? 0.8 : 0.2} className="w-full flex justify-center gap-12">
					<img src="/assets/hero_light.svg" alt="" className="block dark:hidden w-full max-md:max-w-[540px]"/>
					<img src="/assets/hero_dark.svg" alt="" className="hidden dark:block w-full max-md:max-w-[540px]"/>
				</FadeIn>
			</div>
		</section>

		/*<section className="h-[95vh] bg-hero bg-no-repeat bg-cover bg-center relative">
			{/!* overlay *!/}
			<div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>

			<div className="container mx-auto h-full flex items-center">
				<div className="z-20 text-white text-center xl:text-left mx-auto xl:mx-0 flex flex-col items-center xl:items-start max-w-[608px] my-3">
					<div className="mb-8 flex justify-center items-center gap-4">
						<Logo />
						<h1 className="text-4xl font-extrabold text-black">
							Your Public Service Tool
						</h1>
					</div>

					<p className="text-4xl font-extrabold text-white">
						<Typewriter
							words={["For Filipinos", "By Filipinos"]}
							loop={false}
							cursor
							cursorStyle="|"
							typeSpeed={70}
							deleteSpeed={50}
							delaySpeed={1500}
						/>
					</p>

					<div className="mt-12">
						<SearchButton />
					</div>
				</div>
			</div>
		</section>*/
	);
};

export default Hero;
