import React from 'react';
import PasswordField from "@/components/ui/form/PasswordField";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";


function Page(props) {
  return (
    <section className="flex flex-col w-full items-center mx-4 mb-36 pt-[120px]">
      {/* Password and security form */}
      <div className="flex flex-col gap-[60px] w-full max-w-[600px] lg:max-w-[1120px]">
        <div className="flex flex-col w-full max-w-[600px] items-start gap-8 py-0 px-6">
          {/* Header */}
          <div className="flex flex-col items-start gap-2 w-full">
            <h1
              className="flex flex-col justify-center h-[2.625rem] text-[#111] font-inter text-[1.75rem] font-semibold leading-[12px]">
              Password and security
            </h1>
            <div className=" text-[#111] font-inter leading-[120%]">
              Make changes to your account information and controls.
            </div>
          </div>

          {/* Change password */}
          <PasswordField/>

          {/* Deactivation and deletion*/}
          <div className="heading-1 flex flex-col items-start w-full gap-4.5">
            <div className=" text-[#111] font-inter text-xl font-semibold leading-[120%]">
              Deactivation and deletion
            </div>

            {/* Deactivate */}
            <div className="flex flex-col grow items-start w-full">
              <div className="text-[#111] font-inter font-semibold leading-[120%]">
                Deactivate account
              </div>
              <div className="flex w-full gap-8">
                <div className="flex grow text-[#111] font-inter leading-[120%]">
                  Temporarily disable your Kaby account.
                </div>

                <ButtonSecondary>Deactivate account</ButtonSecondary>
              </div>
            </div>

            {/* Terminate */}
            <div className="flex flex-col grow items-start w-full">
              <div className="text-[#111] font-inter font-semibold leading-[120%]">
                Terminate account
              </div>
              <div className="flex w-full gap-8">
                <div className="flex grow text-[#111] font-inter leading-[120%]">
                  Permanently delete your data and everything associated with your account
                </div>
                <ButtonSecondary>Terminate account</ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset and save buttons */}
      <div
        className="bottom-0 right-0 flex fixed justify-center items-center gap-2 py-4 px-6 w-full border-t border-t-[#e9e9e9] bg-white">
        <ButtonSecondary disabled={true}>Reset</ButtonSecondary>
        <ButtonPrimary disabled={true}>Save</ButtonPrimary>
      </div>

    </section>
  );
}

export default Page;