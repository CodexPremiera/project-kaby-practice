'use client';

import ManagerRow from "./manager_row";
// import { useBarangayContext } from "@/app/context/BarangayContext";
interface ManagerListProps {
  citizens: Citizen[] | null;
  workers: Workers[] | null;
  accessRoles: AccessRoles[] | null;
}
interface Citizen {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string; 
  barangay_id: string;
  is_worker: boolean;
}
interface Workers {
  id:string;
  citizen_id: string;
  position: string;
}
interface AccessRoles {
  id: string;
  worker_id: string;
  access_role: string;
  date_added: string;
}

const ManagerList = ({ citizens, workers, accessRoles }: ManagerListProps) => {
  if (!citizens || !workers || !accessRoles) return null;

  const managers = workers.map(worker => {
    const citizen = citizens.find(c => c.id === worker.citizen_id);
    const access = accessRoles.find(role => role.worker_id === worker.id);

    

    if (!citizen || !access) return null;

    return {
      id: citizen.id,
      name: `${citizen.last_name}, ${citizen.first_name}${citizen.middle_name ? ` ${citizen.middle_name}` : ""}`,

      position: worker.position,
      role: access.access_role,
      added: access.date_added,
    };
  }).filter(Boolean); 

  console.log("These are workers", workers);
  console.log("These are cit", citizens);
  console.log("These are accRole", accessRoles);
  console.log("These are managers", managers);

  return (
    <div className="flex flex-col w-full gap-8">
      {managers.map((manager, index) => (
        <ManagerRow key={index} index={index} {...manager} />
      ))}
    </div>
  );
};

export default ManagerList;
