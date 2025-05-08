'use client';

import ManagerRow from "./manager_row";
import {useManagerContext} from "@/components/settings/access_control/manager_context";

const ManagerList = () => {
  const { managers } = useManagerContext();

  return (
    <div className="flex flex-col w-full gap-8">
      {managers.map((manager, index) => (
        <ManagerRow key={index} index={index} {...manager} />
      ))}
    </div>
  );
};

export default ManagerList;
