'use client';

import ManagerRow from "./manager_row";
import {useManagerContext} from "@/components/settings/access_control/manager_context";
import { useBarangayContext } from "@/app/context/BarangayContext";

const ManagerList = () => {
  // const { barangay_id } = useBarangayContext();
  const {managers} = useManagerContext();
  // fet
  return (
    <div className="flex flex-col w-full gap-8">
      {managers.map((manager, index) => (
        <ManagerRow key={index} index={index} {...manager} />
      ))}
    </div>
  );
};

export default ManagerList;
