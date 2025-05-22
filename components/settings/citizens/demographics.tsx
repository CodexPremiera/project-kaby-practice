"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import SelectField from "@/components/ui/form/SelectField";
import CheckboxGroup from "@/components/ui/form/CheckboxGroup";

function Demographics() {
  // Mock original values
  const [originalData, setOriginalData] = useState({
    citizenship: "Derrick",
    religion: "Yap",
    employment: "Engineer",
    highest_education: "College",
    otherInfo: [] as string[],
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
        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="Citizenship"
            placeholder="Enter your citizenship"
            value={formData.citizenship}
            onChange={(e) => setFormData({...formData, middleName: e.target.value})}
            hasChanged={formData.citizenship !== originalData.citizenship}
          />
          <TextField
            field_name="Religion"
            placeholder="Enter your religion"
            value={formData.religion}
            onChange={(e) => setFormData({...formData, suffix: e.target.value})}
            hasChanged={formData.religion !== originalData.religion}
          />
        </div>

        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="Employment"
            placeholder="Enter your employment"
            value={formData.employment}
            onChange={(e) => setFormData({...formData, middleName: e.target.value})}
            hasChanged={formData.employment !== originalData.employment}
          />
          <SelectField
            field_name="Highest education"
            value={formData.highest_education}
            onChange={(e) =>
              setFormData({ ...formData, highest_education: e.target.value })
            }
            options={[
              "No formal education",
              "Elementary level",
              "Elementary graduate",
              "Junior high school level",
              "Junior high school graduate",
              "Senior high school level",
              "Senior high school graduate",
              "Vocational/Technical certificate",
              "Some college (no degree)",
              "Associate degree",
              "Bachelor’s degree",
              "Master’s degree",
              "Doctorate/PhD",
              "Prefer not to say"
            ]}
            hasChanged={formData.highest_education !== originalData.highest_education}
          />

        </div>

        <CheckboxGroup
          options={[
            "Person with Disability (PWD)",
            "Overseas Filipino Workers (OFW)",
            "Out of School Children",
            "Indigenous People",
            "Solo Parent",
          ]}
          hasChanged={formData.otherInfo !== originalData.otherInfo}
          selected={formData.otherInfo}
          onChange={(updated) =>
            setFormData({ ...formData, otherInfo: updated })
          }
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
