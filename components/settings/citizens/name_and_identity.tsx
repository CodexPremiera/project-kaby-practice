"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import SelectField from "@/components/ui/form/SelectField";
import DateField from "@/components/ui/form/DateField";

function NameAndIdentity() {
  // Mock original values
  const [originalData, setOriginalData] = useState({
    firstName: "Derrick",
    lastName: "Yap",
    middleName: "Cruz",
    suffix: "Jr.",
    sex: "Male",
    birthdate: "1990-01-01",
    birthplace: "Cebu City",
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

  // handlers
  const handleReset = () => setFormData({ ...originalData });
  const handleSave = () => setOriginalData({ ...formData });

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-2 lg:gap-4 w-full">
        <h1 className="text-[1.75rem] font-semibold hidden lg:block">Name and identity</h1>
        <p className="text-sm text-muted-foreground">
          Keep confidential details private. Information you add here is visible to anyone who can view your profile.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-8 w-full mt-6">
        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="Firstname"
            placeholder="Enter your firstname"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            hasChanged={formData.firstName !== originalData.firstName}
          />
          <TextField
            field_name="Lastname"
            placeholder="Enter your lastname"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            hasChanged={formData.lastName !== originalData.lastName}
          />
          </div>

          <div className="flex max-md:flex-col gap-4 w-full">
            <TextField
              field_name="Middle name"
              placeholder="Enter your middle name"
              value={formData.middleName}
              onChange={(e) => setFormData({...formData, middleName: e.target.value})}
              hasChanged={formData.middleName !== originalData.middleName}
            />
            <TextField
              field_name="Suffix"
              placeholder="Enter your suffix"
              value={formData.suffix}
              onChange={(e) => setFormData({...formData, suffix: e.target.value})}
              hasChanged={formData.suffix !== originalData.suffix}
            />
          </div>

          <div className="flex max-md:flex-col gap-4 w-full">
            <SelectField
              field_name="Sex"
              value={formData.sex}
              onChange={(e) => setFormData({...formData, sex: e.target.value})}
              options={["Male", "Female", "Non-binary", "Prefer not to say"]}
              hasChanged={formData.sex !== originalData.sex}
            />
            <DateField
              field_name="Birthdate"
              value={formData.birthdate}
              onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
              hasChanged={formData.birthdate !== originalData.birthdate}
            />
            <TextField
              field_name="Birthplace"
              placeholder="Enter your birthplace"
              value={formData.birthplace}
              onChange={(e) => setFormData({...formData, birthplace: e.target.value})}
              hasChanged={formData.birthplace !== originalData.birthplace}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 py-4">
          <ButtonSecondary disabled={isDisabled} onClick={handleReset} className="max-md:grow">Reset</ButtonSecondary>
          <ButtonPrimary disabled={isDisabled} onClick={handleSave} className="max-md:grow">Save</ButtonPrimary>
        </div>
    </>
  );
}

export default NameAndIdentity;
