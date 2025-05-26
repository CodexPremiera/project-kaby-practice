'use client'
import Image from "next/image";
import React from "react";
import { RiHome3Fill } from "react-icons/ri";
import { useBarangayContext } from "@/app/context/BarangayContext";

export default function BarangayProfileClient() {
    const data = useBarangayContext();
    const {barangayName,barangayAddress,barangayProfilePic,about} = useBarangayContext();
    console.log(data,"this is barangay profile pic");

    return (
        <div className="flex gap-4 lg:gap-6 items-center">
            <Image
                // src="/assets/img/profile/bg-profile.png"
                src={getPublicImageUrl(barangayProfilePic)}
                width={60}
                height={60}
                alt="Profile"
                className="w-12 h-12 lg:w-15 lg:h-15 rounded-full object-cover"
            />
            <div className="flex-col gap-2">
                <div className="flex gap-3 items-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl overflow-hidden">{barangayName}</h1>
                    {/* <h1 className="text-2xl md:text-3xl lg:text-4xl overflow-hidden">Labangonaaa</h1> */}
                    {/* <div className="w-7 h-7">
                        <Image
                            src="/assets/home_badge.svg"
                            width={28}
                            height={28}
                            alt="Profil"
                            className="w-5 h-5 lg:w-7 lg:h-7 rounded-full object-cover my-auto"
                        />
                    </div> */}
                </div>
                <span className="text-secondary truncate max-lg:text-sm">
                            {/* South District, Cebu City, Cebu */}
                            {barangayAddress}
                        </span>
            </div>
            <div className="flex-col gap-2">
                {about}
            </div>
        </div>
    )
}   
const getPublicImageUrl = (path) => {
//   if (!path) return "/default-avatar.png"; 
    console.log("this is path",path);
  
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${path}`;

};