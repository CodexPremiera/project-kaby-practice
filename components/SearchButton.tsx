import { RiSearch2Line } from "react-icons/ri";

const SearchButton = () => {
	return (
		<button className="w-[320px] h-[44px] py-[5px] pl-[10px] pr-[5px] flex items-center justify-between min-w-[200px] group bg-black-100 rounded-[30px]">
			<div className="w-11 h-11 bg-primary flex items-center justify-center">
				<div>
					<RiSearch2Line className="text-white text-xl" />
				</div>
			</div>
			<div className="flex-1 text-center tracking-[1.2px] text-primary text-sm">
				Search for services
			</div>
		</button>
	);
};

export default SearchButton;
