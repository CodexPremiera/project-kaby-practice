import Link from "next/link";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBar = () => {
	return (
		<div>
			<Link href="/search?show=true" className="w-full sm:w-5xl">
				<div className="flex items-center w-full px-4 border border-gray-300 bg-white rounded-md">
					<RiSearch2Line className="text-gray-500 mr-2" />
					<input
						type="text"
						placeholder="Search for services"
						className="w-full focus:outline-none focus:ring-0 text-[14px] h-10"
					/>
				</div>
			</Link>
		</div>
	);
};

export default SearchBar;
