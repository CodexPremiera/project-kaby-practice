"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function SidebarLink({ href, icon}) {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={clsx(
        "flex justify-center items-center gap-2.5 p-2.5 rounded-md transition duration-200 hover:bg-[#f1f1f1]",
        { "bg-[#e9e9e9]": isActive }
      )}
    >
      {icon}
    </Link>
  );
}
