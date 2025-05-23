import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import {ManagerProvider} from "@/components/settings/access_control/manager_context";
import ManagerList from "@/components/settings/access_control/manager_list";
import React from "react";

function Page() {
  return (
    <ManagerProvider>
      <div className="flex flex-row justify-between items-center gap-2 w-full">
        <h1
          className="flex flex-col justify-center text-3xl font-semibold leading-[12px]">
          Access Control
        </h1>
        <ButtonSecondary>Add a manager</ButtonSecondary>
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
    </ManagerProvider>
  );
}

export default Page;
