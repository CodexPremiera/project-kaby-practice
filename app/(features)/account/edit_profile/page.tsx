"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import EmailField from "@/components/ui/form/EmailField";
import TextAreaField from "@/components/ui/form/TextAreaField";

function Page() {
  // Mock original values
  const [originalData, setOriginalData] = useState({
    username: "dc_yap",
    email: "derrick.yap@example.com",
    about: "Our barangay is committed to public service and community development.",
    website: "https://barangay-yap.gov.ph"
  });

  // State for each field
  const [formData, setFormData] = useState({ ...originalData });
  const [isDisabled, setIsDisabled] = useState(true);

  // Track changes
  useEffect(() => {
    const hasChanged = Object.entries(formData).some(
      ([key, value]) => value !== originalData[key as keyof typeof originalData]
    );
    setIsDisabled(!hasChanged);
  }, [formData]);

  // Reset handler
  const handleReset = () => setFormData({ ...originalData });

  // Save handler
  const handleSave = () => setOriginalData({ ...formData });

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h1 className="flex flex-col justify-center h-[2.625rem] font-inter text-[1.75rem] font-semibold leading-[12px]">
          Edit Profile
        </h1>
        <p className="font-inter leading-[120%]">
          Keep confidential details private. Information you add here is visible to anyone who can view your profile.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-8 w-full">
        <div className="flex max-md:flex-col gap-8 md:gap-4 w-full">
          <TextField
            field_name="Username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            hasChanged={formData.username !== originalData.username}
          />
          <EmailField
            placeholder="Type new email to change"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            hasChanged={formData.email !== originalData.email}
          />
        </div>

        <TextAreaField
          field_name="About"
          placeholder="Tell us about your barangay"
          value={formData.about}
          onChange={(e) => setFormData({...formData, about: e.target.value})}
          hasChanged={formData.about !== originalData.about}
        />

        <TextField
          field_name="Website"
          placeholder="Enter your barangay website"
          value={formData.website}
          onChange={(e) => setFormData({...formData, website: e.target.value})}
          hasChanged={formData.website !== originalData.website}
        />

        <div className="flex items-center gap-2 py-4">
          <ButtonSecondary disabled={isDisabled} onClick={handleReset} className="max-md:grow">Reset</ButtonSecondary>
          <ButtonPrimary disabled={isDisabled} onClick={handleSave} className="max-md:grow">Save</ButtonPrimary>
        </div>
      </div>
    </>
  )
    ;
}

export default Page;
