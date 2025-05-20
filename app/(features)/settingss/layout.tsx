import React from "react";
import SettingTab from "@/components/settings/SettingTab";

export default function layout({ children }: Readonly<{  children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen relative">
      {/* content */}
      <div className="main flex items-start w-full min-h-full mx-auto lg:ml-[40px] xl:ml-[72px]">

        <div className="setting_tab hidden lg:flex flex-col flex-shrink-0 sticky top-0 justify-center items-start gap-6 w-[200px] pt-30">
          <SettingTab href="/edit_profile" name="Edit Profile"/>
          <SettingTab href="/password_and_security" name="Password and security"/>
          <SettingTab href="/access_control" name="Access Control"/>
        </div>

        <div className="flex w-full pt-20 lg:pt-30 max-xl:justify-center">
          <div className="flex flex-col gap-[60px] w-full max-w-[720px] mx-6 xl:ml-40 2xl:ml-50">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}