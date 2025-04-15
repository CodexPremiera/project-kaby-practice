"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingTab({ href, name}) {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.endsWith(`${href}`);

  return (
    <Link
      href={`.${href}`}
      className = {`flex items-center gap-2.5 pb-3 text-[#111] font-inter font-semibold leading-[12px] transition-all 
      duration-200 ${isActive? `border-b-[3px] border-b-[#111]` : ``}`}
    >
      {name}
    </Link>
  );
}
