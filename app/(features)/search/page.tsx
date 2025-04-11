"use client";
import React from "react";
import SearchModal from "@/components/mainbar/SearchModal";
import { useSearchParams } from "next/navigation";
import { RiFilter3Line, RiSearch2Line } from "react-icons/ri";
import Logo from "@/components/Logo";
import SearchResults from "./SearchResults";

const Search = () => {
	const searchParams = useSearchParams();
	const show = searchParams.get("show");

	return (
		<>
			<div className="flex flex-col">
				<div className="flex space-between items-center gap-3 border-b border-gray/20 py-4">
					<div className="ml-6">
						<Logo />
					</div>

					<div className="flex items-center mt-2 mb-4 w-4xl px-2 pt-3 pb-3 border border-gray-300 rounded-md hover:bg-primary">
						<div className="ml-2 mr-4">
							<RiSearch2Line className="text-gray-500" />
						</div>
						<input
							type="text"
							name=""
							placeholder="Search for services"
							required
							className="w-full focus:outline-none focus:ring-0"
						/>
					</div>
					<div className="flex items-center w-[150px] mt-2 mb-4 px-2 pt-3 pb-3 border border-gray-300 rounded-md hover:bg-primary">
						<div className="ml-2 mr-4">
							<RiFilter3Line className="text-gray-500" />
						</div>
						<input
							type="text"
							name=""
							placeholder="Filter"
							required
							className="w-full focus:outline-none focus:ring-0"
						/>
					</div>
					{show && <SearchModal />}
				</div>
				<div className="relative mx-auto p-6 w-6xl ">
					<SearchResults />
				</div>
			</div>
		</>
	);
};

export default Search;
