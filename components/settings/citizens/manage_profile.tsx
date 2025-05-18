import React from 'react';
import PasswordField from "@/components/ui/form/PasswordField";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";

function ManageProfile() {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-2 w-full">
        <h1 className="text-[1.75rem] font-semibold hidden lg:block">Manage profile</h1>
        <div className=" leading-[120%]">
          Make changes to your account information and controls.
        </div>
      </div>

      {/* Change password */}
      <div className="flex flex-col w-full gap-2">
        <span className="font-semibold leading-[120%]">
          Password
        </span>
        <PasswordField/>
      </div>

      {/* Deactivation and deletion*/}
      <div className="heading-1 flex flex-col items-start w-full gap-8">
        <div className=" text-xl font-semibold leading-[120%]">
          Deactivation and deletion
        </div>


        {/* Terminate */}
        <div className="flex flex-row grow items-center w-full gap-2 mt-1">
          <div className="flex flex-col grow gap-2">
            <span className="font-semibold leading-[120%]">
              Badges visibility
            </span>
            <span className="flex grow leading-[120%]">
              Permanently delete your Kaby account
            </span>
          </div>

          <ButtonSecondary className="max-sm:mt-6">Terminate</ButtonSecondary>
        </div>
      </div>
    </>
  );
}

export default ManageProfile;