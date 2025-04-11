"use client";
import React from "react";
import SearchModal from "@/components/mainbar/SearchModal";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Search = () => {
	const searchParams = useSearchParams();
	const show = searchParams.get("show");

	return (
		<>
			<div className="container mx-auto text-center p-8">
				<h1 className="text-2xl font-bold">Welcome to the Search Page</h1>

				<Link href="/search/?show=true">SUMMON THE MODAL</Link>

				{show && <SearchModal />}
			</div>
		</>
	);
};

export default Search;
