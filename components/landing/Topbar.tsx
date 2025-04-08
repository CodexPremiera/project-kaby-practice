import { RiNewsLine } from "react-icons/ri";
const Topbar = () => {
	return (
		<section
			className="py-4 xl:h-12 xl:py-0 bg-secondary flex items-center"
			id="home"
		>
			<div className="container mx-auto">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-6">
					<div className="hidden xl:flex items-center gap-8">
						{/* news */}
							<div className="w-8 h-8  text-primary flex items-center justify-center">
								<RiNewsLine />
							</div>
							<p className="font-medium text-primary">Some quick announcement here</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Topbar;
