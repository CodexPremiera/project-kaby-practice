"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import EmailField from "@/components/ui/form/EmailField";

function Demographics() {
  // Mock original values
  const [originalData, setOriginalData] = useState({
    email: "derrick@hotmail",
    mobile: "0912 345 6789",
    telephone: "245 0987",
  });

  // Form state
  const [formData, setFormData] = useState({ ...originalData });
  const [isDisabled, setIsDisabled] = useState(true);

  // Detect changes
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

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-2 lg:gap-4 w-full">
        <h1 className="text-[1.75rem] font-semibold hidden lg:block">Demographics</h1>
        <p className="text-sm text-muted-foreground">
          Update your demographics and keep your profile up to date.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-8 w-full mt-6">
        <EmailField
          field_name="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          hasChanged={formData.email !== originalData.email}
        />

        <TextField
          field_name="Mobile number"
          placeholder="Enter your mobile number"
          value={formData.mobile}
          onChange={(e) => setFormData({...formData, mobile: e.target.value})}
          hasChanged={formData.mobile !== originalData.mobile}
        />

        <TextField
          field_name="Telephone number"
          placeholder="Enter your telephone number"
          value={formData.telephone}
          onChange={(e) => setFormData({...formData, telephone: e.target.value})}
          hasChanged={formData.telephone !== originalData.telephone}
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 py-4">
        <ButtonSecondary disabled={isDisabled} onClick={handleReset} className="max-md:grow">Reset</ButtonSecondary>
        <ButtonPrimary disabled={isDisabled} onClick={handleSave} className="max-md:grow">Save</ButtonPrimary>
      </div>
    </>
  );
}

export default Demographics;
