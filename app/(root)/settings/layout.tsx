import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/Header";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import SettingTab from "@/components/settings/SettingTab";

export default function layout({ children }: Readonly<{  children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen relative">
      <Sidebar/>
      <Header/>

      {/* content */}
      <section className="main flex items-start px-7 w-full min-h-full ml-[72px]">

        <div className="flex flex-col flex-shrink-0 sticky top-0 justify-center items-start gap-6 w-[200px] pt-[120px]">
          <SettingTab href="/edit_profile" name="Edit Profile"/>
          <SettingTab href="/password_and_security" name="Password and security"/>
          <SettingTab href="/access_control" name="Access Control"/>
        </div>

        {children}
      </section>

    </div>
  )
}