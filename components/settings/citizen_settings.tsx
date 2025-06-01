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
import { useCitizenContext } from '@/app/context/CitizenContext';


interface CitSettingsProps {
  citizenId : string ;
}
function CitizenSettings({citizenId} : CitSettingsProps) {

  const [activeTab, setActiveTab] = useState<keyof typeof TAB_COMPONENTS>("Identity");
  const [showMobileSwitcher, setShowMobileSwitcher] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");


  const handleTabChange = (tab: keyof typeof TAB_COMPONENTS) => {
    setActiveTab(tab);
    setShowMobileSwitcher(false); // Auto-close mobile tab switcher
  };
  console.log("this is ictizen id", citizenId)
  const TAB_COMPONENTS = {
    Identity: <NameAndIdentity userId={citizenId} />,
    Demographics: <Demographics userId={citizenId} />,
    Residence: <Residence userId={citizenId}/>,
    Contact: <ContactDetails userId={citizenId}/>,
    Security: <PasswordAndSecurity />,
  };

  const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
    Identity: "Name and identity",
    Demographics: "Demographics",
    Residence: "Residence",
    Contact: "Contact details",
    Security: "Password and security",
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

export default CitizenSettings;