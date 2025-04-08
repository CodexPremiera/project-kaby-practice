import { RiSearch2Line } from "react-icons/ri";

const SearchButton = () => {
	return (
		<button className="w-[320px] h-[44px] py-[5px] pl-[5px] pr-[5px] flex items-center justify-between min-w-[180px] group bg-black rounded-[30px]">
			<div className="w-11 h-11 flex items-center justify-center">
				<div>
					<RiSearch2Line className="text-primary text-xl" />
				</div>
			</div>
			<div className="flex-1 text-primary text-sm">Search for services</div>
		</button>
	);
};
export default SearchButton;
