"use client";

import Logo from "../Logo";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import {LogoutToggle} from "@/components/header/logout/LogoutToggle";
import { useCitizenContext } from "@/app/context/CitizenContext";
import {getPublicImageUrl} from "@/components/profile/BarangayProfileClient";
import Image from "next/image";
import React from "react";
const CitizenHeader = () => {
	const citizenCtx = useCitizenContext();
  	const last = citizenCtx?.lastName || null;
  	const mid = citizenCtx?.middleName || null;
  	const first = citizenCtx?.firstName || null;

	return (
		<header
			className="h-[65px] fixed background-1 top-0 w-screen px-4 sm:px-6 flex items-center justify-between z-20 py-8">
			<div className="flex items-center gap-1 select-none cursor-pointer">
				<Logo/>
				<div className="flex items-center gap-2">
					<span className="italic">for Citizens</span>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className="flex gap-4 items-center">
					<div className="flex items-center gap-2">
						<LogoutToggle/>
						<Link href="/services" className="hidden sm:inline text-sm font-medium">
								{last} {first} {mid}
						</Link>
					</div>
					<div className="flex p-[2px] border-2 rounded-full border-accent">
						<Image
							src={getPublicImageUrl(citizenCtx.citizenProfilePic) || "/default-profile.png"}
							width={60}
							height={60}
							alt="Profile"
							className="w-8 h-8 object-cover rounded-full"
						/>
					</div>
				</div>
				<ModeToggle/>
			</div>
		</header>
	);
};

export default CitizenHeader;
