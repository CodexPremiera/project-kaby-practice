"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import SelectField from "@/components/ui/form/SelectField";
import CheckboxGroup from "@/components/ui/form/CheckboxGroup";

interface DemographicsProps {
  userId: string | null;
}

// Deep comparison for string arrays
const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, index) => val === sortedB[index]);
};

function Demographics({ userId }: DemographicsProps) {
  const [originalData, setOriginalData] = useState({
    citizenship: "",
    religion: "",
    employment: "",
    highest_education: "",
    other_information: [] as string[],
  });

  const [formData, setFormData] = useState({ ...originalData });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch original data
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/citizen_settings/demographics/${userId}`, {
          method: "GET",
          cache: "no-store",
        });

        const data = await res.json();
        const userData = data?.data;
        console.log(userData, "this is userData");

        const parsed = {
          citizenship: userData?.citizenship || "",
          religion: userData?.religion || "",
          employment: userData?.employment || "",
          highest_education: userData?.highest_education || "",
          other_information: Array.isArray(userData?.other_information)
            ? userData.other_information
            : [],
        };

        setOriginalData(parsed);
        setFormData(parsed);
      } catch (error) {
        console.error("Error fetching citizen info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Detect changes
  useEffect(() => {
    const hasChanged = Object.entries(formData).some(([key, value]) => {
      if (key === "other_information") {
        return !arraysEqual(
          value as string[],
          originalData[key as keyof typeof originalData] as string[]
        );
      }
      return value !== originalData[key as keyof typeof originalData];
    });

    setIsDisabled(!hasChanged);
  }, [formData, originalData]);

  const handleReset = () => setFormData({ ...originalData });

  const handleSave = async () => {
    setSubmitting(true);
    console.log(formData, "formdata");
    try {
      const res = await fetch(`/api/citizen_settings/demographics/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update data");

      await res.json();
      setOriginalData({ ...formData });
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading demographics data...</div>;

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
            onChange={(e) =>
              setFormData({ ...formData, citizenship: e.target.value })
            }
            hasChanged={formData.citizenship !== originalData.citizenship}
          />
          <TextField
            field_name="Religion"
            placeholder="Enter your religion"
            value={formData.religion}
            onChange={(e) =>
              setFormData({ ...formData, religion: e.target.value })
            }
            hasChanged={formData.religion !== originalData.religion}
          />
        </div>

        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="Employment"
            placeholder="Enter your employment"
            value={formData.employment}
            onChange={(e) =>
              setFormData({ ...formData, employment: e.target.value })
            }
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
              "Bachelor degree",
              "Master degree",
              "Doctorate/PhD",
              "Prefer not to say",
            ]}
            hasChanged={
              formData.highest_education !== originalData.highest_education
            }
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
          hasChanged={
            !arraysEqual(formData.other_information, originalData.other_information)
          }
          selected={formData.other_information}
          onChange={(updated) =>
            setFormData({ ...formData, other_information: updated })
          }
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 py-4">
        <ButtonSecondary
          disabled={isDisabled}
          onClick={handleReset}
          className="max-md:grow"
        >
          Reset
        </ButtonSecondary>
        <ButtonPrimary
          disabled={isDisabled}
          onClick={handleSave}
          className="max-md:grow"
        >
          Save
        </ButtonPrimary>
      </div>
    </>
  );
}

export default Demographics;
