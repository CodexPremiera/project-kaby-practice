'use client'
import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";
import { useBarangayContext } from "@/app/context/BarangayContext";

export default function BarangayProfileClient() {
    const {barangayName,barangayAddress} = useBarangayContext();

    return (
        <div className="flex gap-4 lg:gap-6 items-center">
            <Image
                src="/assets/img/profile/bg-profile.png"
                width={60}
                height={60}
                alt="Profile"
                className="w-12 h-12 lg:w-15 lg:h-15 rounded-full object-cover"
            />
            <div className="flex-col gap-2">
                <div className="flex gap-3 items-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl overflow-hidden">Labangon</h1>
                    <div className="w-7 h-7">
                        <Image
                            src="/assets/home_badge.svg"
                            width={28}
                            height={28}
                            alt="Profil"
                            className="w-5 h-5 lg:w-7 lg:h-7 rounded-full object-cover my-auto"
                        />
                    </div>
                </div>
                <span className="text-secondary truncate max-lg:text-sm">
                            South District, Cebu City, Cebu
                        </span>
            </div>
        </div>
    )
}