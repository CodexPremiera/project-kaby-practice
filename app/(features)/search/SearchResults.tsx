"use client";
import React from "react";
import SearchModal from "@/components/modal/SearchModal";
import { useSearchParams } from "next/navigation";
import { RiFilter3Line, RiSearch2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const SearchResults = () => {
	const searchParams = useSearchParams();
	const show = searchParams.get("show");

	return (
		<>
			<div className="flex flex-col mx-auto">
				<div className="flex justify-between items-center px-8 border-b border-gray/20 ">
					<div className="flex items-center mt-2 mb-4 w-5xl px-2 py-2 border border-gray-300 rounded-md hover:bg-primary">
						<div className="ml-2 mr-4">
							<RiSearch2Line className="text-gray-500" />
						</div>
						<input
							type="text"
							name=""
							placeholder="Search for services"
							required
							className="w-full focus:outline-none focus:ring-0 text-[14px] h6"
						/>
					</div>
					<div className="flex items-center w-[130px] mt-2 mb-4 px-2 py-2 border border-gray-300 rounded-md hover:bg-primary">
						<div className="ml-2 mr-4">
							<RiFilter3Line className="text-gray-500" />
						</div>
						<p className="w-full focus:outline-none focus:ring-0 text-[14px] text-black/60">
							Filter
						</p>
					</div>
					{show && <SearchModal />}
				</div>
				<div className="relative px-9 w-6xl overflow-y-auto">
					<div className="flex gap-5 py-5">
						<Button variant="tag">Your Service</Button>
						<Button variant="tag">Around You</Button>
						<Button variant="tag">General Public</Button>
					</div>
					<div className="py-120">Showing Results for [query]</div>
				</div>
			</div>
		</>
	);
};

export default SearchResults;
