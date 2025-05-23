"use client";

import React, { useState } from "react";
import PasswordField from "@/components/ui/form/PasswordField";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";

function PasswordAndSecurity() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill out both password fields.");
      return;
    }

    if (currentPassword === newPassword) {
      alert("New password cannot be the same as current password.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/change_pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const result = await res.json();

      if (result.error || result.success === false) {
        alert(result.error || "Password change failed.");
      } else {
        alert("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error("Password change error:", error);
      alert("An error occurred while changing your password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-2 lg:gap-4 w-full">
        <h1 className="text-[1.75rem] font-semibold hidden lg:block">
          Password and security
        </h1>
        <div className="leading-[120%]">
          Make changes to your account information and controls.
        </div>
      </div>

      {/* Change password */}
      <div className="flex flex-col w-full gap-4 mt-4">
        {/* <span className="font-semibold leading-[120%]">Current Password</span> */}

        <PasswordField
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />

        <PasswordField
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />


        <ButtonPrimary onClick={handleChangePassword} disabled={submitting}>
          {submitting ? "Submitting..." : "Update Password"}
        </ButtonPrimary>
      </div>

      {/* Deactivation and deletion */}
      <div className="heading-1 flex flex-col items-start w-full gap-8 mt-8">
        <div className="text-xl font-semibold leading-[120%]">
          Deactivation and deletion
        </div>

        {/* Deactivate */}
        <div className="flex flex-row grow items-center w-full gap-2">
          <div className="flex flex-col grow gap-2">
            <span className="font-semibold leading-[120%]">Deactivate account</span>
            <span className="flex grow leading-[120%]">Temporarily disable your account.</span>
          </div>

          <ButtonSecondary className="max-sm:mt-6">Deactivate</ButtonSecondary>
        </div>

        {/* Terminate */}
        <div className="flex flex-row grow items-center w-full gap-2 mt-1">
          <div className="flex flex-col grow gap-2">
            <span className="font-semibold leading-[120%]">Terminate account</span>
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

export default PasswordAndSecurity;
