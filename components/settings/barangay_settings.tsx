"use client"

import React, {useEffect, useState} from 'react';
import NameAndIdentity from "@/components/settings/citizens/name_and_identity";
import Demographics from "@/components/settings/citizens/demographics";
import Residence from "@/components/settings/citizens/residence";
import ContactDetails from "@/components/settings/citizens/contact_details";
import PasswordAndSecurity from "@/components/settings/citizens/password_and_security";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";
import {ChevronDown} from "lucide-react";
import {useMediaQuery} from "@/app/hooks/useMediaQuery";
import EditProfile from "@/components/settings/barangay/edit_profile";
import AccessControl from "@/components/settings/barangay/access_control";

type BarangaySettingsProps = {
  citizens: {
      id: string;
      first_name: string;
      last_name: string;
      middle_name?: string;
      barangay_id: string;
      is_worker: boolean;
  }[];
  workers: {
    id:string;
    citizen_id: string;
    position: string;
  }[];
  accessRoles: {
    id: string;
    worker_id: string;
    access_role: string;
    date_added: string;
  }[];
  managers :{
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
  }[];
  non_managers:{
    citizen_id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    position: string;
    barangay_id : string;
    barangay_address:string;
  	worker_id : string;

  }[];

};





function BarangaySettings({citizens,workers,accessRoles,managers,non_managers}: BarangaySettingsProps) {
  
  const TAB_COMPONENTS = {
    Profile: <EditProfile />,
    Security: <PasswordAndSecurity />,
    Access: <AccessControl citizens={citizens} workers={workers} accessRoles={accessRoles} managers={managers} non_managers={non_managers} />,
  };
  const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
    Profile: "Edit profile",
    Security: "Password and security",
    Access: "Access control",
  };
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_COMPONENTS>("Profile");
  const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const handleTabChange = (tab: keyof typeof TAB_COMPONENTS) => {
    setActiveTab(tab);
    setShowMobileSwitcher(false); // Auto-close mobile tab switcher
  };

  return (
    <div className="flex relative">
      <div className="main flex flex-col lg:flex-row items-start w-full mx-auto lg:ml-[40px] xl:ml-[72px]">
        {!isLargeScreen && (
          <div className="flex w-fit gap-4 items-center relative mx-6 px-2">
            <h1 className="text-2xl font-semibold">{TAB_LABELS[activeTab]}</h1>

            <button onClick={() => setShowMobileSwitcher(prev => !prev)}>
              <ChevronDown className="w-6 h-6" />
            </button>

            {showMobileSwitcher && (
              <TabSwitcher
                tabComponents={TAB_COMPONENTS}
                tabLabels={TAB_LABELS}
                defaultTab={"Identity"}
                className="flex w-[200px] flex-col flex-shrink-0 absolute bottom-0 right-0 translate-y-full background-1 p-4 rounded-xl drop-shadow-xl items-start gap-6"
                activeTab={activeTab}
                setActiveTab={handleTabChange}
              />
            )}
          </div>
        )}

        {isLargeScreen && (
          <TabSwitcher
            tabComponents={TAB_COMPONENTS}
            tabLabels={TAB_LABELS}
            defaultTab={"Identity"}
            className="flex flex-col flex-shrink-0 sticky top-0 justify-center items-start gap-6 w-[200px] pt-30"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        <div className="flex w-full pt-6 lg:pt-20 max-xl:justify-center">
          <div className="flex flex-col gap-6 w-full max-w-[780px] mx-6 xl:ml-30 2xl:ml-40 background-1 rounded-2xl sm:rounded-3xl border border-light-color p-6 md:p-12 rounded-xl ">
            {TAB_COMPONENTS[activeTab]}
          </div>
        </div>
      </div>
    </div>
  )

}

export default BarangaySettings;