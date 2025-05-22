import React from 'react';
import Image from "next/image";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import {Official} from "@/data/officials";
import { format } from "date-fns";

function OfficialItem({
                        name,
                        // email,
                        position,
                        startTerm,
                        endTerm,
                        imageUrl,
                      }: Official ) {
  return (
    <div className="flex justify-between items-start self-stretch py-3 px-4 rounded-xl bg-white">
      <div className="flex items-center gap-5 max-w-[18.75rem]">
        <div className="flex items-center gap-3 w-[18.75rem]">
          <Image
            // src={imageUrl}
            src={getPublicImageUrl(imageUrl)} 
            alt={`${name}'s Avatar`}
            width={36}
            height={36}
            className="object-cover w-9 h-9 rounded-full"
          />
          <div className="user_name flex flex-col justify-center items-start p-1 h-9">
            <div className="text-primary font-medium">{name}</div>
            {/* <div className="text-secondary text-xs">{email}</div> */}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 self-stretch w-60 text-primary font-medium">
        {position}
      </div>
      <div className="flex items-center gap-2.5 self-stretch w-[10rem] text-primary font-medium">
        {/* {startTerm} */}
        {format(new Date(startTerm), "MMMM dd, yyyy")}
        
      </div>
      <div className="flex items-center gap-2.5 self-stretch w-[5.25rem] text-primary font-medium">
        {endTerm}
      </div>
      <ButtonSecondary className="text-sm">View profile</ButtonSecondary>
    </div>
  );
}
const getPublicImageUrl = (path: string | null | undefined) => {
  if (!path) return "/default-avatar.png"; 
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${path}`;

};

export default OfficialItem;
