import React from 'react';
import Link from "next/link";
import Image from "next/image";
import SidebarLink from "@/components/sidebar/SidebarLink";
import {
  HeartHandshake as ServicesIcon,
  House as HomeIcon, Moon as DarkModeIcon,
  Settings as SettingsIcon,
  UsersRound as CitizensIcon
} from "lucide-react";
import SidebarTab from "@/components/sidebar/SidebarTab";

function Sidebar(props) {
  return (
    <aside
      className="fixed top-0 left-0 flex flex-col flex-shrink-0 justify-between items-center pt-8 pb-6 w-[4.5rem] h-screen z-10 border-r border-r-[#e9e9e9] bg-white">

      <div className="flex flex-col items-center gap-10">
        <Link href="#">
          <Image src="/logo.svg" alt="logo" width={24} height={30}/>
        </Link>

        <div className="flex flex-col items-center gap-10 w-fit">
          <SidebarLink href="/home" icon={<HomeIcon/>}/>
          <SidebarLink href="/citizens" icon={<CitizensIcon/>}/>
          <SidebarLink href="/services" icon={<ServicesIcon/>}/>
          <SidebarLink href="/settings" icon={<SettingsIcon/>}/>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <SidebarTab href="/settings" icon={<DarkModeIcon/>}/>
      </div>
    </aside>
  );
}

export default Sidebar;