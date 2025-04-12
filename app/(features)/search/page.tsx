"use client";
import React from "react";
import SearchModal from "@/components/modal/SearchModal";
import { useSearchParams } from "next/navigation";
import { RiFilter3Line, RiSearch2Line } from "react-icons/ri";
import Link from "next/link";
import SearchResults from "../../../components/search/SearchResults";

const Search = () => {
	const searchParams = useSearchParams();
	const show = searchParams.get("show");

	return (
		<>
			<div className="flex flex-col mx-auto py-4 px-8">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center   space-y-4 sm:space-y-0">
					{/* Search Bar */}
					<Link href="/search?show=true" className="w-full sm:w-5xl">
						<div className="flex items-center w-full px-4 border border-gray-300 rounded-md hover:bg-primary">
							<RiSearch2Line className="text-gray-500 mr-2" />
							<input
								type="text"
								placeholder="Search for services"
								className="w-full focus:outline-none focus:ring-0 text-[14px] h-10"
							/>
						</div>
					</Link>

					{/* Filter Button */}
					<div className="flex items-center sm:ml-4 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-primary h-10 justify-center sm:justify-start">
						<RiFilter3Line className="text-gray-500 mr-2" />
						<p className="text-[14px] text-black/60">Filter</p>
					</div>
				</div>

				{/* Modal */}
				{show && <SearchModal />}

				{/* Search Results */}
				<div className="mt-4">
					<SearchResults />
				</div>
			</div>
		</>
	);
};

export default Search;
