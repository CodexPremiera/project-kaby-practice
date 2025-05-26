'use client';

import ManagerRow from "./manager_row";
// import { useBarangayContext } from "@/app/context/BarangayContext";
interface ManagerListProps {
  // citizens: Citizen[] | null;
  // workers: Workers[] | null;
  // accessRoles: AccessRoles[] | null;
  managers: Managers[] | null;
}
// interface Citizen {
//   id: string;
//   first_name: string;
//   last_name: string;
//   middle_name?: string; 
//   barangay_id: string;
//   is_worker: boolean;
// }
// interface Workers {
//   id:string;
//   citizen_id: string;
//   position: string;
// }
// interface AccessRoles {
//   id: string;
//   worker_id: string;
//   access_role: string;
//   date_added: string;
// }
interface Managers {
    citizen_id : string;
    last_name : string;
    first_name : string;
    middle_name : string;
    barangay_id : string;
    barangay_address : string;
    position : string;
    access_role : string;
    date_added :string;
    date_ended:string;
    profile_pic:string;
}

const ManagerList = ({ managers}: ManagerListProps) => {
  if(!managers) return null;
  const transformedManagers = managers.map((manager) => ({
    name: `${manager.last_name}, ${manager.first_name}${manager.middle_name ? ' ' + manager.middle_name : ''}`,
    position: manager.position,
    role: manager.access_role,
    added: manager.date_added,
    photo : manager.profile_pic,
  }));

  console.log("managers",managers)
  return (
    <div className="flex flex-col w-full gap-8">
      {transformedManagers.map((manager, index) => (
        <ManagerRow key={index} index={index} {...manager} />
      ))}
    </div>
  );
};

export default ManagerList;
