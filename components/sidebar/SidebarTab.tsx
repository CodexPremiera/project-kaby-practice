"use client";

import Link from "next/link";
import clsx from "clsx";

export default function SidebarTab({icon}) {
  return (
    <Link
      href="#"
      className={clsx(
        "flex justify-center items-center gap-2.5 p-2.5 rounded-md transition duration-200 hover:bg-[#f1f1f1]"
      )}
    >
      {icon}
    </Link>
  );
}
