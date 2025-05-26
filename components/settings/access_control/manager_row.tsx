"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonDropdown from "@/components/ui/buttons/ButtonDropdown";
import {Ellipsis} from "lucide-react";
import {getRelativeTime} from "@/lib/utils";
import ManagerModal from "@/components/settings/access_control/manager_modal";

interface CustomRowProps {
  photo?: string;
  name?: string;
  position?: string;
  role?: string;
  added?: string;

  index: number;
}

const ManagerRow: React.FC<CustomRowProps> = ({
                                                photo  = `uploads/depg`,
                                                name = 'Firstname M. Lastname',
                                                position = 'Barangay Position',
                                                role = 'Account Role',
                                                added = new Date(),
                                                index
                                              }) => {
  const addedRelative = getRelativeTime(added);

  return (
    <div className="flex w-full items-center justify-between h-fit gap-2">
      <div className="flex gap-2 w-[240px]">
        <Link href={`#`}>
          <Image
            src={getPublicImageUrl(photo)}
            alt={"photo of account manager"}
            width={34}
            height={34}
            className="rounded-full"
          />
        </Link>
        <div className="user_name flex flex-col justify-center items-start gap-2 p-1 h-9">
          <div className="font-medium leading-[12px]">{name}</div>
          <div className="text-secondary text-sm leading-[12px]">{position}</div>
        </div>
      </div>
      <div
        className="flex w-[180px] items-center gap-2.5 self-stretch font-medium leading-[12px]">
        {role}
      </div>
      <div
        className="flex w-[120px] items-center gap-2.5 self-stretch font-medium leading-[12px]">
        {addedRelative}
      </div>

      <ButtonDropdown
        icon={<Ellipsis size={24} />}
        // modal={<ManagerModal index={index} /> }
      />

    </div>
  );
}
const getPublicImageUrl = (path: string | null | undefined) => {
  if (!path) return "/default-avatar.png"; 
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${path}`;

};

export default ManagerRow;