"use client"

import React, {useEffect, useState} from 'react';
import NameAndIdentity from "@/components/settings/citizens/name_and_identity";
import Demographics from "@/components/settings/citizens/demographics";
import Residence from "@/components/settings/citizens/residence";
import ContactDetails from "@/components/settings/citizens/contact_details";
import PasswordAndSecurity from "@/components/settings/citizens/password_and_security";
import SwitchTab from "@/components/ui/tabs/SwitchTab";
import {useRouter, useSearchParams} from "next/navigation";
import Services from "@/components/home/services/Services";
import Post from "@/components/home/post/Post";
import OfficialsList from "@/components/home/official_list/OfficialsList";
import ContactList from "@/components/home/contact_list/ContactList";
import TabSwitcher from "@/components/ui/tabs/TabSwitcher";

const TAB_COMPONENTS = {
  Identity: <NameAndIdentity />,
  Demographics: <Demographics />,
  Residence: <Residence />,
  Contact: <ContactDetails />,
  Security: <PasswordAndSecurity />,
};

const TAB_LABELS: Record<keyof typeof TAB_COMPONENTS, string> = {
  Identity: "Name and identity",
  Demographics: "Demographics",
  Residence: "Residence",
  Contact: "Contact details",
  Security: "Password and security",
};

function CitizenSettings(props) {
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_COMPONENTS>("Identity");

  return (
    <div className="flex relative">
      {/* content */}
      <div className="main flex items-start w-full mx-auto lg:ml-[40px] xl:ml-[72px]">

        <TabSwitcher tabComponents={TAB_COMPONENTS}
                     tabLabels={TAB_LABELS}
                     defaultTab={"Identity"}
                     className="hidden lg:flex flex-col flex-shrink-0 sticky top-0 justify-center items-start gap-6 w-[200px] pt-30"
                     activeTab={activeTab}
                     setActiveTab={setActiveTab}
        />

        <div className="flex w-full pt-12 lg:pt-20 max-xl:justify-center">
          <div className="flex flex-col gap-6 w-full max-w-[780px] mx-6 xl:ml-30 2xl:ml-40 background-1 rounded-2xl sm:rounded-3xl border border-light-color p-6 md:p-12 rounded-xl ">
            {TAB_COMPONENTS[activeTab]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CitizenSettings;