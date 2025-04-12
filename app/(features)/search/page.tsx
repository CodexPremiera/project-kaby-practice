"use client";
import React from "react";
import SearchModal from "@/components/modal/SearchModal";
import { useSearchParams } from "next/navigation";
import { RiFilter3Line, RiSearch2Line } from "react-icons/ri";
import Link from "next/link";
import SearchResults from "./SearchResults";

const Search = () => {
	const searchParams = useSearchParams();
	const show = searchParams.get("show");

	return (
		<>
			<div className="flex flex-col mx-auto ">
				{/* Modal */}
				{show && <SearchModal />}

				{/* Search Results */}
				<div className=" bg-primary">
					<SearchResults />
				</div>
			</div>
		</>
	);
};

export default Search;
