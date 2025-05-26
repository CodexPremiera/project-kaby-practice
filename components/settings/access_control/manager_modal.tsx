"use client";

import React from "react";
// import {useManagerContext} from "@/components/settings/access_control/manager_context";

function ManagerModal({ index }: { index: number }) {
  // const { removeManager, editManager } = useManagerContext();

  const handleEdit = () => {
    // editManager(index, { name: "Edited Name" }); // Example
  };

  // const handleRemove = () => {
  //   removeManager(index);
  // };

  return (
    <div className="flex flex-col gap-1 text-[#111] absolute top-0 right-0 translate-x-full h-fit bg-white shadow-md py-2 z-10">
      <span
        className="py-1 px-3 hover:text-[#E2B714] transition duration-100 cursor-pointer"
        // onClick={handleEdit}
      >
        Edit
      </span>
      <span
        className="py-1 px-3 hover:text-[#E2B714] transition duration-100 cursor-pointer"
        // onClick={handleRemove}
      >
        Remove
      </span>
    </div>
  );
}

export default ManagerModal;
