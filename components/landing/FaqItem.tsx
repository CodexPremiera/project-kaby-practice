import { useState } from "react";
import { RiSubtractFill, RiAddFill } from "react-icons/ri";

interface FaqItemProps {
	title: string;
	description: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ title, description }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="w-full shadow-md rounded-[20px]">
			<div className="flex items-center justify-between py-6">
				<h4 className="text-lg font-semibold max-w-[300px] sm:max-w-md md:max-w-max ml-6">
					{title}
				</h4>
				<button
					className="w-[44px] h-[44px] bg-secondary flex items-center justify-center rounded-[10px] mr-6"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? (
						<RiSubtractFill
							className={`text-primary text-2xl transition-opacity duration-700  ${
								isOpen ? "opacity-100" : "opacity-0"
							}`}
						/>
					) : (
						<RiAddFill
							className={`text-primary text-2xl transition-opacity duration-700 ${
								isOpen ? "opacity-0" : "opacity-100"
							}`}
						/>
					)}
				</button>
			</div>

			{/* description */}
			<div
				className={`${
					isOpen
						? "max-h-[200px] opacity-100 transition-all duration-500 ease-in-out ml-6"
						: "max-h-0 opacity-100 transition-all duration-300 ease-in-out overflow-hidden ml-6"
				}`}
			>
				<p className="pb-8 flex items-center max-w-[860px]">{description}</p>
			</div>
		</div>
	);
};

export default FaqItem;
