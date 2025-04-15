import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {ChevronDown} from "lucide-react";
import ButtonDropdown from "@/components/ui/buttons/ButtonDropdown";
import ProfileModal from "@/components/sidebar/profile_modal";

function Header(props) {
  return (
    <header className="fixed top-0 right-0 flex items-center w-full bg-white pl-[72px]">
      <div className="flex w-full gap-6 py-4 px-6">
        <div className="search_bar flex items-center gap-2.5 p-3 h-12 w-full rounded-xl bg-[#f1f1f1]">
          <div className="search_anywhere text-[#767676] font-['Inter'] leading-[12px] w-full">Search anywhere</div>
          <div className="x-03 flex shrink-0 justify-center items-center gap-2.5 p-1 w-[1.125rem] h-[1.125rem]">
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 12M12 12L2 2" stroke="#111111" strokeWidth={3} strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-[#111] font-['Inter'] font-medium leading-[12px]">Barangay Labangon</div>
          <Link href={`#`}>
            <Image
              src={`https://placehold.co/40x40`}
              alt={"placeholder"}
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
          <ButtonDropdown icon={<ChevronDown/>} modal={<ProfileModal/>}/>
        </div>
      </div>
    </header>
  );
}

export default Header;