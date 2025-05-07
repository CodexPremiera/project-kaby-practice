import { RiArrowRightUpLine } from "react-icons/ri";

interface ButtonProps {
	text: string;
}

const CustomButton = ({ text }: ButtonProps) => {
	return (
		<button className="w-[210px] h-[44px] py-[5px] pl-[10px] pr-[5px] flex items-center justify-between min-w-[200px] group bg-black rounded-[30px]">
			<div className="flex-1 text-center tracking-[1.2px] text-primary text-sm">
				{text}
			</div>
			<div className="w-8 h-8 mr-1 flex items-center justify-center">
				<div>
					<RiArrowRightUpLine className="text-white text-xl group-hover:rotate-45 transition-all duration-200" />
				</div>
			</div>
		</button>
	);
};

export default CustomButton;
