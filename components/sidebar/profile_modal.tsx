"use client";

import React from "react";

function ProfileModal() {

  const handleLogout = () => {
    console.log("Logging out...")
  };

  return (
    <div className="flex flex-col gap-1 text-[#111] absolute bottom-0 right-0 translate-y-full h-fit bg-white shadow-md py-2 z-10">
      <span
        className="py-1 px-3 hover:text-[#E2B714] transition duration-100 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </span>
    </div>
  );
}

export default ProfileModal;
