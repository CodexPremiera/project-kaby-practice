"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import {getPublicImageUrl} from "@/components/profile/BarangayProfileClient";
import {CitizenProfile, getAddress, getName} from "@/models/CitizenProfile";
import {useCitizenContext} from "@/app/context/CitizenContext";


const CitizenProfileTab = () => {
	let { id } = useParams() as { id: string | undefined | null };
	if (id === undefined || id === null) {
		const citizen = useCitizenContext();
		id = citizen.citizenId;
	}

	const [profile, setProfile] = useState<CitizenProfile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await fetch(`/api/profile/${id}`);
				console.log(res)

				if (!res.ok) throw new Error("Failed to fetch profile");
				const data = await res.json();
				setProfile(data);
			} catch (error) {
				console.error("Error fetching profile:", error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchProfile();
		}
	}, [id]);

	if (loading) {
		return <div className="p-6">Loading profile...</div>;
	}

	if (!profile) {
		return <div className="p-6 text-red-500">Profile not found.</div>;
	}

	return (
		<div className="container mx-4 sm:mx-auto mb-5 	">
			<div className="flex flex-col lg:flex-row items-center justify-between gap-6 card-custom p-6 shadow background-1 rounded-3xl">
				<div className="flex gap-4 items-center text-center sm:text-left">
					<Image
						src={getPublicImageUrl(profile.profile_pic) || "/default-profile.png"}
						width={60}
						height={60}
						alt="Profile"
						className="w-[60px] h-[60px] object-cover rounded-full"
					/>
					<div className="flex flex-col">
						<p className="text-lg font-semibold">{getName(profile)}</p>
						<p className="text-sm text-gray-600">{getAddress(profile)}</p>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-6 py-6 px-6">
					<div className="text-center sm:text-left">
						<span className="h5 mr-3 font-bold">{profile.currentBadge}</span>
						Current Badges
					</div>
					<div className="text-center sm:text-left">
						<span className="h5 mr-3 font-bold">{profile.accumulatedBadge}</span>
						Accumulated Badges
					</div>
				</div>
			</div>
		</div>
	);
};

export default CitizenProfileTab;