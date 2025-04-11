import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";

const SearchButton = () => {
	return (
		<Link href="/search?show=true">
			<button className="w-[380px] h-[44px] py-[5px] pl-[5px] pr-[5px] flex items-center min-w-[240px] group bg-black rounded-[30px]">
				<div className="pl-3">
					<RiSearch2Line className="text-primary text-xl" />
				</div>
				<div className="text-primary text-sm pl-6">Search for services</div>
			</button>
		</Link>
	);
};

export default SearchButton;
