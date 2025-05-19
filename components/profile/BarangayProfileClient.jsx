'use client'
import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";
import { useBarangayContext } from "@/app/context/BarangayContext";

export default function BarangayProfileClient() {
    const {barangayName,barangayAddress} = useBarangayContext();

    return(
        <div className="flex gap-4 items-center text-left my-4 flex-shrink-0 w-[500px] px-8 lg:px-0">
                            <Image
                                src="/assets/profile/bg-profile.png"
                                width={60}
                                height={60}
                                alt="Profile"
                                className="min-w-[60px] min-h-[60px] rounded-full object-cover"
                            />
                            <div className="flex flex-col max-w-[220px]">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-lg font-semibold truncate">{barangayName}</p>
                                    <RiHome3Fill className="text-secondary" size={22} />
                                </div>
                                <p className="text-sm text-gray-600 truncate">
                                    {/* South District Cebu City */}
                                    {barangayAddress}
                                </p>
                            </div>
                        </div>
    )
}