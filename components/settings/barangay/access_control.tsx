"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import EmailField from "@/components/ui/form/EmailField";
import {ManagerProvider} from "@/components/settings/access_control/manager_context";
import ManagerList from "@/components/settings/access_control/manager_list";
import AddManagerModal from "@/components/modal/AddManagerModal";

type AccessControlProps = {
  citizens: {
    id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
  }[];
};

const AccessControl: React.FC<AccessControlProps> = ({citizens} ) => {
  console.log("citizens", citizens);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <ManagerProvider>
      <div className="flex flex-row justify-between items-center gap-2 w-full ">
        <h1
          className="flex flex-col justify-center text-3xl font-semibold leading-[12px] hidden lg:block">
          Access Control
        </h1>
        <ButtonSecondary onClick={handleOpenModal}>Add a manager</ButtonSecondary>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex w-full items-center justify-between h-9 gap-2 leading-[12px]">
          <div className="flex gap-3 w-[240px]">
            Manager
          </div>
          <div
            className="flex w-[180px] items-center gap-2.5">
            Role
          </div>
          <div
            className="flex w-[120px] items-center gap-2.5">
            Added
          </div>

          <div className="w-6"></div>
        </div>

        <ManagerList/>
      </div>
       {showModal && <AddManagerModal citizens= {citizens} onClose={handleCloseModal} />}
    </ManagerProvider>
  );
}

export default AccessControl;
